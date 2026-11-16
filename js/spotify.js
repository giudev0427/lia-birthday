/**
 * LIA — Official Spotify Embed integration for the featured song.
 */
(function () {
  "use strict";

  const TRACK_URI = "spotify:track:516E1cUXyiGvy2xAOmwLln";
  const TRACK_URL = "https://open.spotify.com/track/516E1cUXyiGvy2xAOmwLln";
  let embedCreated = false;

  function translate(source) {
    return window.LiaI18n?.t(source) || source;
  }

  function pauseAmbientMusic() {
    if (!window.LiaAudio?.playing) return;
    window.LiaAudio.stop();
    window.dispatchEvent(new CustomEvent("lia:ambientstatechange"));
  }

  function showFallback() {
    if (embedCreated) return;
    const element = document.getElementById("spotify-embed");
    if (!element || element.querySelector("iframe")) return;

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
    const link = document.querySelector("#spotify-embed .spotify-fallback a");
    if (link) {
      link.textContent = translate("No se pudo cargar el reproductor. Abrir Eres la herida más bonita en Spotify");
    }
  }

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    const element = document.getElementById("spotify-embed");
    if (!element || embedCreated) return;

    IFrameAPI.createController(
      element,
      {
        width: "100%",
        height: 152,
        uri: TRACK_URI
      },
      function (controller) {
        embedCreated = true;
        controller.addListener("playback_started", pauseAmbientMusic);
      }
    );
  };

  window.addEventListener("lia:languagechange", updateFallbackLanguage);
  window.setTimeout(showFallback, 8000);
})();
