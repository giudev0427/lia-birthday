/**
 * LIA — A Little World of Magic
 * Main orchestration for the vertical cinematic story scroll experience.
 */
(function () {
  "use strict";

  let welcomeParticles = null;
  let gardenParticles = null;
  let finaleBurstDone = false;

  function initAmbientSystems() {
    if (!window.LiaParticles) return;

      // Welcome star dust
      const welcomeCanvas = document.getElementById("welcome-particles");
      if (welcomeCanvas) {
        welcomeParticles = LiaParticles.createParticles(welcomeCanvas, {
          count: 36,
          mode: "dust",
          color: "rgba(232, 200, 140, 0.55)",
          size: [0.6, 2.0],
          speed: [0.08, 0.32]
        });
      }

        // Garden fireflies
        const gardenCanvas = document.getElementById("garden-canvas");
        if (gardenCanvas) {
          gardenParticles = LiaParticles.createParticles(gardenCanvas, {
            count: 24,
            mode: "firefly",
            color: "rgba(240, 220, 140, 0.75)",
            size: [1.0, 2.6],
            speed: [0.1, 0.35]
          });
        }

        // Static ambient elements
        LiaParticles.createPetals(document.getElementById("garden-petals"), 16);
        LiaParticles.createSparkles(document.getElementById("date-sparkles"), 26);
      }

      function setupFinaleObserver() {
        const finaleSection = document.getElementById("scene-finale");
        const finaleLayer = document.getElementById("finale-layer");
        if (!finaleSection || !finaleLayer || !window.LiaParticles) return;

        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !finaleBurstDone) {
                finaleBurstDone = true;
                LiaParticles.burstConfetti(finaleLayer, 60);
              }
            });
          },
          { threshold: 0.35 }
        );

        io.observe(finaleSection);
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

        function setupControls() {
          // "Descubrir sorpresa" button
          const discoverBtn = document.getElementById("discover-btn");
          if (discoverBtn && window.LiaMotion) {
            discoverBtn.addEventListener("click", () => {
              LiaMotion.scrollToScene("scene-garden");
            });
          }

          // "Volver a vivir la magia" button
          const replayBtn = document.getElementById("replay-btn");
          if (replayBtn) {
            replayBtn.addEventListener("click", () => {
              if (window.LiaLetter) {
                LiaLetter.resetLetter();
              }
              if (window.LiaMotion) {
                LiaMotion.scrollToScene("scene-welcome");
              }
              setTimeout(() => {
                finaleBurstDone = false;
              }, 1200);
            });
          }
        }

        function init() {
          initAmbientSystems();
          setupFinaleObserver();
          setupMusic();
          setupControls();

            if (window.LiaLetter) {
              LiaLetter.initLetter();
            }

            if (window.LiaMotion) {
              LiaMotion.initReveals();
              LiaMotion.initParallax();
              LiaMotion.initSceneNav();
              LiaMotion.initKeyboardNav();
            }

            window.addEventListener(
              "resize",
              () => {
                welcomeParticles?.resize?.();
                gardenParticles?.resize?.();
              },
              { passive: true }
            );

            document.documentElement.classList.add("is-ready");
          }

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init);
          } else {
            init();
          }
        }) ();
