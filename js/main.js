/**
 * LIA — A Little World of Magic
 * Book experience orchestration
 */
(function () {
  const musicBtn = document.getElementById("music-toggle");
  const replayBtn = document.getElementById("replay-btn");

  let systems = {
    ambientParticles: null,
    pageReady: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false
    },
    finaleBurstDone: false
  };

  function initAmbient() {
    const canvas = document.getElementById("welcome-particles");
    if (!canvas || !window.LiaParticles) return;
    systems.ambientParticles = LiaParticles.createParticles(canvas, {
      count: 34,
      mode: "dust",
      color: "rgba(232, 200, 140, 0.5)",
      size: [0.6, 1.8],
      speed: [0.08, 0.3]
    });
  }

  function preparePage(index) {
    if (systems.pageReady[index] || !window.LiaParticles) return;
    systems.pageReady[index] = true;

    if (index === 0) {
      LiaParticles.createPetals(document.getElementById("garden-petals"), 12);
    }
    if (index === 2 && window.LiaLetter) {
      LiaLetter.initLetter();
    }
    if (index === 3) {
      LiaParticles.createSparkles(document.getElementById("date-sparkles"), 22);
    }
    if (index === 4 && !systems.finaleBurstDone) {
      systems.finaleBurstDone = true;
      const layer = document.getElementById("finale-layer");
      LiaParticles.burstConfetti(layer, 52);
    }
  }

  function setupMusic() {
    if (!musicBtn || !window.LiaAudio) return;
    musicBtn.addEventListener("click", async () => {
      const on = await LiaAudio.toggle();
      musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
      musicBtn.setAttribute(
        "aria-label",
        on ? "Silenciar música ambiental" : "Activar música ambiental"
      );
    });
  }

  function setupReplay() {
    if (!replayBtn) return;
    replayBtn.addEventListener("click", () => window.location.reload());
  }

  function init() {
    initAmbient();
    setupMusic();
    setupReplay();

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
      () => systems.ambientParticles?.resize?.(),
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
