/**
 * LIA — A Little World of Magic
 * Motion orchestration: scroll reveals, subtle parallax, keyboard navigation & scene dots.
 */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SCENE_IDS = [
    "scene-welcome",
    "scene-garden",
    "scene-companions",
    "scene-letter",
    "scene-date",
    "scene-finale"
  ];

  let currentSceneIndex = 0;

  function initReveals(root) {
    const scope = root || document;
    const items = scope.querySelectorAll(".reveal");

    if (reduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((el) => io.observe(el));
  }

  function initParallax() {
    if (reduced) return;
    const layers = Array.from(document.querySelectorAll(".parallax"));
    if (!layers.length) return;

    let ticking = false;

    function update() {
      ticking = false;
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.1");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  function scrollToScene(target) {
    let targetEl = null;
    if (typeof target === "number") {
      const id = SCENE_IDS[Math.max(0, Math.min(target, SCENE_IDS.length - 1))];
      targetEl = document.getElementById(id);
    } else if (typeof target === "string") {
      targetEl = document.getElementById(target.replace("#", ""));
    }

    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start"
      });
    }
  }

  function initSceneNav() {
    const dots = Array.from(document.querySelectorAll(".scene-dot"));
    const sections = SCENE_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    if (!dots.length) return;

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
          const targetId = dot.dataset.target;
          if (targetId) {
            scrollToScene(targetId);
          }
        });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const idx = SCENE_IDS.indexOf(id);
          if (idx !== -1) {
            currentSceneIndex = idx;
          }

          dots.forEach((dot) => {
            const active = dot.dataset.target === id;
            dot.classList.toggle("is-active", active);
            if (active) {
              dot.setAttribute("aria-current", "true");
            } else {
              dot.removeAttribute("aria-current");
            }
          });
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((sec) => io.observe(sec));
  }

  function initKeyboardNav() {
    window.addEventListener("keydown", (e) => {
      // Don't intercept if focus is inside an input, button with space/enter, or textarea
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentSceneIndex < SCENE_IDS.length - 1) {
          e.preventDefault();
          scrollToScene(currentSceneIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentSceneIndex > 0) {
          e.preventDefault();
          scrollToScene(currentSceneIndex - 1);
        }
      }
    });
  }

  window.LiaMotion = {
    initReveals,
    initParallax,
    initSceneNav,
    initKeyboardNav,
    scrollToScene,
    reduced
  };
})();
