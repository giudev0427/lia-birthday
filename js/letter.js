/**
 * LIA — A Little World of Magic
 * Interactive envelope → letter reveal with reset capability.
 */
(function () {
  "use strict";

  let opened = false;

  function initLetter() {
    const btn = document.getElementById("envelope-btn");
    const panel = document.getElementById("letter-panel");
    if (!btn || !panel) return;

    function open() {
      if (opened) return;
      opened = true;
      btn.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const flapDelay = reduced ? 0 : 520;
      const hideDelay = reduced ? 0 : 900;

      setTimeout(() => {
        panel.hidden = false;
        panel.classList.add("is-in");
        btn.classList.add("is-fading");
        const greeting = panel.querySelector(".letter-greeting");
        if (greeting) {
          greeting.setAttribute("tabindex", "-1");
          greeting.focus();
        }
      }, flapDelay);

      setTimeout(() => {
        btn.hidden = true;
      }, hideDelay);
    }

    btn.addEventListener("click", open);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  }

  function resetLetter() {
    const btn = document.getElementById("envelope-btn");
    const panel = document.getElementById("letter-panel");
    if (!btn || !panel) return;

    opened = false;
    btn.hidden = false;
    btn.classList.remove("is-open", "is-fading");
    btn.setAttribute("aria-expanded", "false");

    panel.hidden = true;
    panel.classList.remove("is-in");
  }

  window.LiaLetter = {
    initLetter,
    resetLetter
  };
})();
