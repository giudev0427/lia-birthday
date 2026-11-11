/**
 * LIA — A Little World of Magic
 * Main orchestration for the 3D book experience.
 */
(function () {
  "use strict";

  let ambientParticles = null;
  const pageReady = { 0: false, 1: false, 2: false, 3: false, 4: false };
  let finaleBurstDone = false;

  function initAmbient() {
    const canvas = document.getElementById("welcome-particles");
    if (!canvas || !window.LiaParticles) return;
    ambientParticles = LiaParticles.createParticles(canvas, {
      count: 38,
      mode: "dust",
      color: "rgba(232, 200, 140, 0.55)",
      size: [0.6, 2.0],
      speed: [0.08, 0.3]
    });
  }

  function preparePage(index) {
    if (pageReady[index] || !window.LiaParticles) return;
    pageReady[index] = true;

    if (index === 0) {
      LiaParticles.createPetals(document.getElementById("garden-petals"), 14);
    }
    if (index === 2 && window.LiaLetter) {
      LiaLetter.initLetter();
    }
    if (index === 3) {
      LiaParticles.createSparkles(document.getElementById("date-sparkles"), 24);
    }
    if (index === 4 && !finaleBurstDone) {
      finaleBurstDone = true;
      const layer = document.getElementById("finale-layer");
      LiaParticles.burstConfetti(layer, 55);
    }
  }

  function setupMusic() {
    const musicBtn = document.getElementById("music-toggle");
    if (!musicBtn || !window.LiaAudio) return;

    const iconOff = musicBtn.querySelector(".icon-music-off");
    const iconOn = musicBtn.querySelector(".icon-music-on");

    musicBtn.addEventListener("click", async () => {
      const isPlaying = await LiaAudio.toggle();
      musicBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
      musicBtn.setAttribute(
        "aria-label",
        isPlaying ? "Silenciar música ambiental" : "Activar música ambiental"
      );

      if (iconOff && iconOn) {
        if (isPlaying) {
          iconOff.classList.add("hidden");
          iconOn.classList.remove("hidden");
        } else {
          iconOff.classList.remove("hidden");
          iconOn.classList.add("hidden");
        }
      }
    });
  }

  function setupReplay() {
    const replayBtn = document.getElementById("replay-btn");
    if (!replayBtn) return;
    replayBtn.addEventListener("click", () => {
      if (window.LiaLetter) {
        LiaLetter.resetLetter();
      }
      finaleBurstDone = false;
      pageReady[4] = false;
      if (window.LiaBook) {
        LiaBook.close();
      }
    });
  }

  function init() {
    initAmbient();
    setupMusic();
    setupReplay();

    if (window.LiaLetter) {
      LiaLetter.initLetter();
    }

    if (window.LiaBook) {
      LiaBook.init({
        onOpen() {
          preparePage(0);
        },
        onPage(index) {
          preparePage(index);
        }
      });
    }

    window.addEventListener(
      "resize",
      () => ambientParticles?.resize?.(),
      { passive: true }
    );

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
