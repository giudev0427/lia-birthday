/**
 * Reveal on scroll, parallax, active scene dots.
 */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
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

  function initSceneNav() {
    const nav = document.querySelector(".scene-nav");
    const dots = Array.from(document.querySelectorAll(".scene-dot"));
    const sections = dots
      .map((dot) => document.getElementById(dot.dataset.target))
      .filter(Boolean);

    if (!nav || !dots.length) return;

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) {
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          dots.forEach((dot) => {
            const active = dot.dataset.target === id;
            dot.classList.toggle("is-active", active);
            if (active) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
          });
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((sec) => io.observe(sec));
  }

  window.LiaMotion = {
    initReveals,
    initParallax,
    initSceneNav,
    reduced
  };
})();
