/**
 * LIA — Optional external media integration.
 *
 * Fetches themed stock photographs and book cover references from
 * third-party APIs (Unsplash, Pixabay, Google Books, Open Library),
 * filtered by the Design_Palette color scheme.
 *
 * Entirely opt-in: when no API configuration is provided the module is a
 * no-op and every fetch method returns an empty array.  On any failure
 * (timeout, network, parse, API error) the failure is logged to the
 * console for developer debugging and an empty array is returned — no
 * error indicators are ever shown to the end user, so the existing Lia
 * photos and content remain displayed.
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
   * Design_Palette colors (kept in sync with css/styles.css :root)
   * ------------------------------------------------------------- */
  var PALETTE = [
    { name: "night", r: 26, g: 10, b: 16 }, // #1a0a10
    { name: "burgundy", r: 92, g: 18, b: 39 }, // #5c1227
    { name: "ruby", r: 196, g: 30, b: 58 }, // #c41e3a
    { name: "dusty", r: 212, g: 165, b: 165 }, // #d4a5a5
    { name: "cream", r: 247, g: 240, b: 232 }, // #f7f0e8
    { name: "champagne", r: 201, g: 169, b: 98 } // #c9a962
  ];

  /** Maximum distance (0–441.7) for a color to be considered "in palette". */
  var COLOR_THRESHOLD = 120;

  /** Default per-request timeout in milliseconds (Req 7.3). */
  var DEFAULT_TIMEOUT = 10000;

  /** Hard cap on the number of results returned (Req 7.1, 7.2). */
  var MAX_RESULTS = 10;

  var photoCfg = null;
  var bookCfg = null;

  /* ---------------------------------------------------------------
   * Internal helpers
   * ------------------------------------------------------------- */

  /**
   * Clamp a positive integer to MAX_RESULTS.
   * @param {number} n
   * @returns {number}
   */
  function limitResults(n) {
    var max = MAX_RESULTS;
    if (typeof n === "number" && n >= 0) max = Math.min(n, MAX_RESULTS);
    return max;
  }

  /**
   * Convert a hex colour string (#rrggbb or #rgb) to an {r,g,b} object.
   * @param {string} hex
   * @returns {{r:number,g:number,b:number}|null}
   */
  function hexToRgb(hex) {
    if (typeof hex !== "string") return null;
    var h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    if (h.length !== 6) return null;
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r: r, g: g, b: b };
  }

  /**
   * Euclidean distance between two RGB colours.
   * @param {{r:number,g:number,b:number}} a
   * @param {{r:number,g:number,b:number}} b
   * @returns {number}
   */
  function colorDistance(a, b) {
    var dr = a.r - b.r;
    var dg = a.g - b.g;
    var db = a.b - b.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  /**
   * Determine whether a colour is within COLOR_THRESHOLD of any
   * Design_Palette colour.
   * @param {{r:number,g:number,b:number}|null} color
   * @returns {boolean}
   */
  function matchesPalette(color) {
    if (!color) return false;
    for (var i = 0; i < PALETTE.length; i++) {
      if (colorDistance(color, PALETTE[i]) <= COLOR_THRESHOLD) return true;
    }
    return false;
  }

  /**
   * Extract the dominant colour of an image by drawing it to a canvas and
   * sampling pixels.  Returns null when extraction fails (e.g. CORS-tainted
   * canvas) so the caller can fall back gracefully.
   * @param {string} url
   * @returns {Promise<{r:number,g:number,b:number}|null>}
   */
  function extractDominantColor(url) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = function () {
        try {
          var canvas = document.createElement("canvas");
          var w = 24;
          var h = 24;
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);

          var data = ctx.getImageData(0, 0, w, h).data;
          var rSum = 0,
            gSum = 0,
            bSum = 0,
            count = 0;

          for (var i = 0; i < data.length; i += 4) {
            // Skip near-transparent pixels.
            if (data[i + 3] < 125) continue;
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            count++;
          }

          if (count === 0) {
            resolve(null);
            return;
          }

          resolve({
            r: Math.round(rSum / count),
            g: Math.round(gSum / count),
            b: Math.round(bSum / count)
          });
        } catch (e) {
          // Canvas is likely CORS-tainted — cannot read pixels.
          resolve(null);
        }
      };

      img.onerror = function () {
        resolve(null);
      };

      img.src = url;
    });
  }

  /**
   * Build a full request URL from a base URL, appending query parameters.
   * @param {string} baseUrl
   * @param {Object} params
   * @returns {string}
   */
  function buildUrl(baseUrl, params) {
    if (!baseUrl) return "";
    var parts = [];
    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        var val = params[key];
        if (val == null) continue;
        parts.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(String(val))
        );
      }
    }
    if (!parts.length) return baseUrl;
    var sep = baseUrl.indexOf("?") === -1 ? "?" : "&";
    return baseUrl + sep + parts.join("&");
  }

  /**
   * Fetch a JSON resource with an AbortController-based timeout.
   * Resolves with the parsed JSON body, or rejects on error/timeout.
   * @param {string} url
   * @param {number} timeout
   * @returns {Promise<Object>}
   */
  function fetchWithTimeout(url, timeout) {
    return new Promise(function (resolve, reject) {
      if (typeof fetch !== "function") {
        reject(new Error("fetch is not available"));
        return;
      }

      var controller =
        typeof AbortController !== "undefined" ? new AbortController() : null;
      var timerId = null;

      var cleanup = function () {
        if (timerId !== null) clearTimeout(timerId);
      };

      if (controller) {
        timerId = setTimeout(function () {
          controller.abort();
        }, timeout);
      }

      var signal = controller ? controller.signal : undefined;

      fetch(url, { signal: signal })
        .then(function (res) {
          if (!res.ok) {
            throw new Error("HTTP " + res.status);
          }
          return res.json();
        })
        .then(function (body) {
          cleanup();
          resolve(body);
        })
        .catch(function (err) {
          cleanup();
          reject(err);
        });
    });
  }

  /**
   * Pull a usable array of photo-like objects out of an API response.
   * Supports Unsplash ({ results: [] }), Pixabay ({ hits: [] }), and a
   * plain top-level array.
   * @param {Object|Array} body
   * @returns {Array}
   */
  function extractPhotoArray(body) {
    if (Array.isArray(body)) return body;
    if (!body || typeof body !== "object") return [];
    if (Array.isArray(body.results)) return body.results;
    if (Array.isArray(body.hits)) return body.hits;
    if (Array.isArray(body.photos)) return body.photos;
    if (Array.isArray(body.images)) return body.images;
    return [];
  }

  /**
   * Pull a usable array of book-like objects out of an API response.
   * Supports Google Books ({ items: [] }), Open Library ({ docs: [] }),
   * and a plain top-level array.
   * @param {Object|Array} body
   * @returns {Array}
   */
  function extractBookArray(body) {
    if (Array.isArray(body)) return body;
    if (!body || typeof body !== "object") return [];
    if (Array.isArray(body.items)) return body.items;
    if (Array.isArray(body.docs)) return body.docs;
    if (Array.isArray(body.books)) return body.books;
    return [];
  }

  /**
   * Normalise a raw photo API item into {url, alt, source}.
   * @param {Object} item
   * @returns {{url:string,alt:string,source:string}|null}
   */
  function normalizePhoto(item) {
    if (!item || typeof item !== "object") return null;

    // Unsplash: item.urls.regular / .small, item.alt_description, item.user.name
    // Only assign objects to `urls` so that property lookups don't pick up
    // deprecated String.prototype methods (e.g. when previewURL is a string).
    var urls = {};
    if (item.urls && typeof item.urls === "object") urls = item.urls;
    else if (item.image && typeof item.image === "object") urls = item.image;

    var url =
      urls.regular ||
      urls.full ||
      urls.small ||
      urls.raw ||
      item.previewURL ||
      item.webformatURL ||
      item.largeImageURL ||
      item.url ||
      "";
    if (!url) return null;

    var alt =
      item.alt_description ||
      item.description ||
      item.tags ||
      (item.title ? item.title : "") ||
      "";

    var source =
      (item.user && (item.user.name || item.user.username)) ||
      item.source ||
      item.user ||
      "";

    return { url: url, alt: String(alt).slice(0, 125), source: String(source) };
  }

  /**
   * Extract a dominant/average colour from a photo API item when the API
   * provides one.  Returns null when unavailable so the caller can attempt
   * canvas-based extraction.
   * @param {Object} item
   * @returns {{r:number,g:number,b:number}|null}
   */
  function photoApiColor(item) {
    // Unsplash provides a "color" hex field on each photo.
    if (item.color) return hexToRgb(item.color);
    // Pixabay provides no colour field; some APIs use "avg_color".
    if (item.avg_color) return hexToRgb(item.avg_color);
    if (item.dominant_color) return hexToRgb(item.dominant_color);
    return null;
  }

  /**
   * Normalise a raw book API item into {title, coverUrl, author}.
   * @param {Object} item
   * @returns {{title:string,coverUrl:string,author:string}|null}
   */
  function normalizeBook(item) {
    if (!item || typeof item !== "object") return null;

    var title =
      item.title ||
      (item.volumeInfo && item.volumeInfo.title) ||
      (item.volumeInfo && item.volumeInfo.subtitle) ||
      "";

    var coverUrl = "";
    // Google Books: item.volumeInfo.imageLinks.thumbnail
    if (item.volumeInfo && item.volumeInfo.imageLinks) {
      var links = item.volumeInfo.imageLinks;
      coverUrl =
        links.thumbnail ||
        links.smallThumbnail ||
        links.medium ||
        links.large ||
        "";
    }
    // Open Library: item.cover_i  → cover URL via cover_id
    if (!coverUrl && item.cover_i) {
      coverUrl =
        "https://covers.openlibrary.org/b/id/" + item.cover_i + "-M.jpg";
    }
    // Generic cover_url / coverUrl field
    if (!coverUrl) {
      coverUrl = item.cover_url || item.coverUrl || item.cover || "";
    }

    var author = "";
    if (item.volumeInfo && Array.isArray(item.volumeInfo.authors)) {
      author = item.volumeInfo.authors.join(", ");
    } else if (item.author_name) {
      author = Array.isArray(item.author_name)
        ? item.author_name.join(", ")
        : item.author_name;
    } else {
      author = item.author || "";
    }

    if (!title && !coverUrl) return null;

    return {
      title: String(title),
      coverUrl: String(coverUrl),
      author: String(author)
    };
  }

  /* ---------------------------------------------------------------
   * Public module
   * ------------------------------------------------------------- */

  var LiaExternalMedia = {
    /**
     * Initialise the external media module.
     *
     * When `config` is null/undefined, or when `config.photos` /
     * `config.books` are not provided, the corresponding feature is a
     * no-op and its fetch methods return empty arrays.
     *
     * @param {Object|null} config
     * @param {Object|null} config.photos  Photo API config (Unsplash/Pixabay)
     * @param {Object|null} config.books   Book API config (Google Books/Open Library)
     */
    init: function (config) {
      photoCfg = null;
      bookCfg = null;

      if (!config || typeof config !== "object") return;

      if (config.photos && config.photos.enabled) {
        photoCfg = {
          apiUrl: config.photos.apiUrl || "",
          apiKey: config.photos.apiKey || null,
          maxResults: limitResults(config.photos.maxResults),
          timeout:
            config.photos.timeout && config.photos.timeout > 0
              ? config.photos.timeout
              : DEFAULT_TIMEOUT
        };
      }

      if (config.books && config.books.enabled) {
        bookCfg = {
          apiUrl: config.books.apiUrl || "",
          apiKey: config.books.apiKey || null,
          maxResults: limitResults(config.books.maxResults),
          timeout:
            config.books.timeout && config.books.timeout > 0
              ? config.books.timeout
              : DEFAULT_TIMEOUT
        };
      }
    },

    /**
     * Fetch themed photographs for a chapter topic.
     *
     * Results are normalised to {url, alt, source} objects, filtered by
     * Design_Palette colour matching, and capped at a maximum of 10.
     *
     * @param {string} topic  Topic keyword (e.g. "garden", "roses")
     * @returns {Promise<Array<{url:string,alt:string,source:string}>>}
     */
    fetchPhotos: function (topic) {
      if (!photoCfg || !photoCfg.apiUrl) {
        return Promise.resolve([]);
      }

      var params = { query: topic || "" };
      if (photoCfg.apiKey) params.key = photoCfg.apiKey; // Pixabay uses "key"; appended generically
      var url = buildUrl(photoCfg.apiUrl, params);

      return fetchWithTimeout(url, photoCfg.timeout)
        .then(function (body) {
          var raw = extractPhotoArray(body);
          var normalized = [];
          for (var i = 0; i < raw.length && normalized.length < photoCfg.maxResults * 3; i++) {
            var photo = normalizePhoto(raw[i]);
            if (photo) normalized.push({ item: raw[i], photo: photo });
          }

          // Colour filtering: use API metadata when present, otherwise attempt
          // canvas-based extraction.  Images whose colour cannot be determined
          // are included without filtering (graceful degradation).
          var colorTasks = normalized.map(function (entry) {
            var apiColor = photoApiColor(entry.item);
            if (apiColor) return Promise.resolve(apiColor);
            return extractDominantColor(entry.photo.url);
          });

          return Promise.all(colorTasks).then(function (colors) {
            var result = [];
            for (var j = 0; j < normalized.length && result.length < photoCfg.maxResults; j++) {
              var color = colors[j];
              // If colour is unknown, include the image (no filtering).
              if (!color || matchesPalette(color)) {
                result.push(normalized[j].photo);
              }
            }
            return result;
          });
        })
        .catch(function (err) {
          console.warn("[LiaExternalMedia] fetchPhotos failed:", err);
          return [];
        });
    },

    /**
     * Fetch book cover references for a chapter topic.
     *
     * Results are normalised to {title, coverUrl, author} objects and
     * capped at a maximum of 10.
     *
     * @param {string} topic  Topic keyword
     * @returns {Promise<Array<{title:string,coverUrl:string,author:string}>>}
     */
    fetchBooks: function (topic) {
      if (!bookCfg || !bookCfg.apiUrl) {
        return Promise.resolve([]);
      }

      var params = { q: topic || "" };
      if (bookCfg.apiKey) params.key = bookCfg.apiKey;
      var url = buildUrl(bookCfg.apiUrl, params);

      return fetchWithTimeout(url, bookCfg.timeout)
        .then(function (body) {
          var raw = extractBookArray(body);
          var result = [];
          for (var i = 0; i < raw.length && result.length < bookCfg.maxResults; i++) {
            var book = normalizeBook(raw[i]);
            if (book) result.push(book);
          }
          return result;
        })
        .catch(function (err) {
          console.warn("[LiaExternalMedia] fetchBooks failed:", err);
          return [];
        });
    }
  };

  window.LiaExternalMedia = LiaExternalMedia;
})();
