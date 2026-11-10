/**
 * Book open + page-turn experience
 */
(function () {
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Book = {
    stage: null,
    book: null,
    coverBtn: null,
    discoverBtn: null,
    spread: null,
    pages: [],
    flip: null,
    nav: null,
    prevBtn: null,
    nextBtn: null,
    dots: [],
    index: 0,
    turning: false,
    opened: false,
    onOpen: null,
    onPage: null,

    init(hooks = {}) {
      this.stage = document.getElementById("book-stage");
      this.book = document.getElementById("magic-book");
      this.coverBtn = document.getElementById("open-book-btn");
      this.discoverBtn = document.getElementById("discover-btn");
      this.spread = document.getElementById("book-spread");
      this.flip = document.getElementById("page-flip");
      this.nav = document.getElementById("book-nav");
      this.prevBtn = document.getElementById("prev-page");
      this.nextBtn = document.getElementById("next-page");
      this.pages = Array.from(document.querySelectorAll(".page"));
      this.dots = Array.from(document.querySelectorAll("#page-dots .scene-dot"));
      this.onOpen = hooks.onOpen || null;
      this.onPage = hooks.onPage || null;

      if (!this.book || !this.pages.length) return;

      const open = () => this.open();
      this.coverBtn?.addEventListener("click", open);
      this.discoverBtn?.addEventListener("click", open);

      this.prevBtn?.addEventListener("click", () => this.goTo(this.index - 1));
      this.nextBtn?.addEventListener("click", () => this.goTo(this.index + 1));

      this.dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const page = Number(dot.dataset.page);
          if (!Number.isNaN(page)) this.goTo(page);
        });
      });

      document.addEventListener("keydown", (e) => {
        if (!this.opened || this.turning) return;
        if (e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault();
          this.goTo(this.index + 1);
        }
        if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          this.goTo(this.index - 1);
        }
      });
    },

    open() {
      if (this.opened || !this.book) return;
      this.opened = true;

      this.stage.dataset.state = "opening";
      this.book.classList.add("is-opening");

      if (this.spread) this.spread.hidden = false;

      const openDelay = reduced() ? 0 : 1200;

      setTimeout(() => {
        this.book.classList.remove("is-opening");
        this.book.classList.add("is-open");
        this.stage.dataset.state = "open";

        if (this.coverBtn) this.coverBtn.hidden = true;
        if (this.nav) this.nav.hidden = false;

        this.showPage(0, false);
        this.onOpen?.();
      }, openDelay);
    },

    showPage(index, animate, direction = 1) {
      if (index < 0 || index >= this.pages.length) return;
      const prev = this.index;
      this.index = index;

      this.pages.forEach((page, i) => {
        const active = i === index;
        page.classList.toggle("is-active", active);
        page.hidden = !active;
        page.classList.remove("is-exit-left", "is-exit-right");
        if (!active && i === prev && animate) {
          page.classList.add(direction > 0 ? "is-exit-left" : "is-exit-right");
        }
      });

      this.dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });

      if (this.prevBtn) this.prevBtn.disabled = index === 0;
      if (this.nextBtn) {
        this.nextBtn.disabled = index === this.pages.length - 1;
        this.nextBtn.innerHTML =
          index === this.pages.length - 1
            ? "Fin"
            : 'Siguiente <span aria-hidden="true">›</span>';
      }

      // Focus page for a11y
      const activePage = this.pages[index];
      if (activePage) {
        activePage.setAttribute("tabindex", "-1");
        activePage.focus({ preventScroll: true });
        const scroller = activePage.querySelector(".page-scroll");
        if (scroller) scroller.scrollTop = 0;
      }

      this.onPage?.(index, prev);
    },

    goTo(index) {
      if (!this.opened || this.turning) return;
      if (index < 0 || index >= this.pages.length || index === this.index) return;

      const direction = index > this.index ? 1 : -1;

      if (reduced() || !this.flip) {
        this.showPage(index, true, direction);
        return;
      }

      this.turning = true;
      this.flip.classList.remove("is-turning-forward", "is-turning-back");
      // Force reflow
      void this.flip.offsetWidth;
      this.flip.classList.add("is-animating");
      this.flip.classList.add(direction > 0 ? "is-turning-forward" : "is-turning-back");

      const mid = 400;
      setTimeout(() => {
        this.showPage(index, false, direction);
      }, mid);

      setTimeout(() => {
        this.flip.classList.remove("is-animating", "is-turning-forward", "is-turning-back");
        this.turning = false;
      }, 860);
    }
  };

  window.LiaBook = Book;
})();
