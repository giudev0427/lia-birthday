/**
 * LIA — Official Spotify Embed integration for the featured song.
 */
(function () {
  "use strict";

  const TRACK_URI = "spotify:track:516E1cUXyiGvy2xAOmwLln";
  const TRACK_URL = "https://open.spotify.com/track/516E1cUXyiGvy2xAOmwLln";
  const embedStates = new Map();

  function translate(source) {
    return window.LiaI18n?.t(source) || source;
  }

  function pauseAmbientMusic() {
    if (!window.LiaAudio?.playing) return;
    window.LiaAudio.stop();
    window.dispatchEvent(new CustomEvent("lia:ambientstatechange"));
  }

  function showFallback(element) {
    if (!element || embedStates.get(element) === "created" || element.querySelector("iframe")) return;

    const link = document.createElement("a");
    link.href = TRACK_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = translate("No se pudo cargar el reproductor. Abrir Eres la herida más bonita en Spotify");

    const paragraph = document.createElement("p");
    paragraph.className = "spotify-fallback";
    paragraph.appendChild(link);
    element.replaceChildren(paragraph);
  }

  function updateFallbackLanguage() {
    document.querySelectorAll("[data-spotify-embed] .spotify-fallback a").forEach((link) => {
      link.textContent = translate("No se pudo cargar el reproductor. Abrir Eres la herida más bonita en Spotify");
    });
  }

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    document.querySelectorAll("[data-spotify-embed]").forEach((element) => {
      if (embedStates.has(element)) return;
      embedStates.set(element, "loading");

      IFrameAPI.createController(
        element,
        {
          width: "100%",
          height: 152,
          uri: TRACK_URI
        },
        function (controller) {
          embedStates.set(element, "created");
          controller.addListener("playback_started", pauseAmbientMusic);
        }
      );
    });
  };

  window.addEventListener("lia:languagechange", updateFallbackLanguage);
  window.setTimeout(() => {
    document.querySelectorAll("[data-spotify-embed]").forEach(showFallback);
  }, 8000);
})();
