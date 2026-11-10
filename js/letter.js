/**
 * Interactive envelope → letter reveal.
 */
(function () {
  function initLetter() {
    const btn = document.getElementById("envelope-btn");
    const panel = document.getElementById("letter-panel");
    if (!btn || !panel) return;

    let opened = false;

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

  window.LiaLetter = { initLetter };
})();
