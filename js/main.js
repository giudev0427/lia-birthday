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

  function setupBirthdayCountdown() {
    const countdown = document.getElementById("birthday-countdown");
    if (!countdown) return;

    const parts = (countdown.dataset.targetDate || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return;

    const [year, month, day] = parts;
    const target = new Date(year, month - 1, day, 0, 0, 0, 0);
    const birthdayEnds = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
    if (Number.isNaN(target.getTime())) return;

    const daysOutput = document.getElementById("countdown-days");
    const hoursOutput = document.getElementById("countdown-hours");
    const minutesOutput = document.getElementById("countdown-minutes");
    const announcement = document.getElementById("countdown-announcement");

    function updateCountdown() {
      const now = new Date();
      const remaining = Math.max(0, target.getTime() - now.getTime());
      const totalMinutes = Math.floor(remaining / 60000);
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;

      if (daysOutput) daysOutput.textContent = String(days).padStart(2, "0");
      if (hoursOutput) hoursOutput.textContent = String(hours).padStart(2, "0");
      if (minutesOutput) minutesOutput.textContent = String(minutes).padStart(2, "0");

      if (now >= target) {
        countdown.setAttribute("aria-label", "La cuenta regresiva terminó; cumpleaños de Lia, 21 años");
        if (announcement) {
          announcement.textContent = now < birthdayEnds
            ? "¡Feliz cumpleaños, Lia! Hoy cumples 21 años."
            : "Celebramos los 21 años de Lia, cuyo cumpleaños fue el 28 de noviembre de 2026.";
        }
      } else {
        countdown.setAttribute(
          "aria-label",
          `${days} días, ${hours} horas y ${minutes} minutos para el cumpleaños de Lia`
        );
      }
    }

    updateCountdown();
    window.setInterval(updateCountdown, 60000);
  }

  function init() {
    initAmbient();
    setupMusic();
    setupReplay();
    setupBirthdayCountdown();

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
