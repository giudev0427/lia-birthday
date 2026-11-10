/**
 * Lightweight canvas particles: dust, fireflies, confetti sparks.
 */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function createParticles(canvas, options) {
    if (!canvas || reduced) return { destroy() {}, resize() {} };

    const ctx = canvas.getContext("2d");
    const opts = Object.assign(
      {
        count: 40,
        color: "rgba(232, 200, 120, 0.7)",
        size: [0.8, 2.2],
        speed: [0.15, 0.55],
        mode: "dust" // dust | firefly | spark
      },
      options
    );

    let particles = [];
    let raf = 0;
    let running = true;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      const rect = canvas.getBoundingClientRect();
      particles = Array.from({ length: opts.count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: opts.size[0] + Math.random() * (opts.size[1] - opts.size[0]),
        vx: (Math.random() - 0.5) * opts.speed[1],
        vy: opts.speed[0] + Math.random() * opts.speed[1],
        a: 0.2 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        tw: 0.5 + Math.random() * 1.5
      }));
    }

    function frame(t) {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const p of particles) {
        p.phase += 0.01 * p.tw;
        if (opts.mode === "firefly") {
          p.x += Math.sin(p.phase) * 0.35 + p.vx * 0.2;
          p.y += Math.cos(p.phase * 0.8) * 0.3 - 0.05;
          p.a = 0.25 + (Math.sin(p.phase) + 1) * 0.35;
        } else if (opts.mode === "spark") {
          p.x += p.vx;
          p.y += p.vy;
          p.a *= 0.995;
        } else {
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.35;
        }

        if (p.y < -10) p.y = rect.height + 10;
        if (p.y > rect.height + 10) p.y = -10;
        if (p.x < -10) p.x = rect.width + 10;
        if (p.x > rect.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.fillStyle = opts.color.replace(/[\d.]+\)$/g, `${p.a})`);
        if (opts.color.startsWith("#")) {
          ctx.globalAlpha = p.a;
          ctx.fillStyle = opts.color;
        }
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      running = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    function destroy() {
      running = false;
      cancelAnimationFrame(raf);
      particles = [];
    }

    resize();
    spawn();
    start();

    return { destroy, resize, start, stop: () => { running = false; cancelAnimationFrame(raf); } };
  }

  function createPetals(container, count) {
    if (!container || reduced) return;
    container.innerHTML = "";
    const n = count || 14;
    for (let i = 0; i < n; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${9 + Math.random() * 12}s`;
      petal.style.animationDelay = `${Math.random() * 8}s`;
      petal.style.width = `${10 + Math.random() * 10}px`;
      petal.style.height = `${14 + Math.random() * 12}px`;
      petal.style.opacity = String(0.45 + Math.random() * 0.4);
      container.appendChild(petal);
    }
  }

  function createSparkles(container, count) {
    if (!container || reduced) return;
    container.innerHTML = "";
    for (let i = 0; i < (count || 24); i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.animationDuration = `${2 + Math.random() * 3}s`;
      s.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(s);
    }
  }

  function burstConfetti(container, count) {
    if (!container) return;
    if (reduced) return;

    const colors = ["#C41E3A", "#C9A962", "#D4A5A5", "#F7F0E8", "#9B1B3A", "#E0C988"];
    const n = count || 48;
    for (let i = 0; i < n; i++) {
      const piece = document.createElement("span");
      const roll = Math.random();
      piece.className = "confetti-piece";
      if (roll > 0.72) piece.classList.add("is-heart");
      else if (roll > 0.45) piece.classList.add("is-petal");
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
      piece.style.animationDuration = `${2.8 + Math.random() * 2.4}s`;
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${8 + Math.random() * 10}px`;
      if (roll > 0.55 && roll <= 0.72) {
        piece.style.borderRadius = "50%";
        piece.style.width = piece.style.height;
      }
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 5500);
    }
  }

  window.LiaParticles = {
    createParticles,
    createPetals,
    createSparkles,
    burstConfetti,
    reduced
  };
})();
