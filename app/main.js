const shareMenu = {
  vShape: document.querySelector(".card__share__content--shape"),
  menuElement: document.querySelector(".card__share__content"),
  toggleButton: document.querySelector(".card__share__btn"),
  isShowing: false,
  showMenu() {
    requestAnimationFrame(() => {
      this.menuElement.style.display = "flex";
      this.menuElement.style.opacity = "0";
      this.toggleButton.classList.add("menu-shown");

      const rect = this.menuElement.getBoundingClientRect();
      let offsetX = outerWidth - (rect.width + rect.left);
      if (offsetX < 0) {
        const x = Math.min(Math.abs(offsetX) + 24);
        this.menuElement.style.margin = `0 ${x}px 0 0`;
        this.vShape.style.margin = `0 0 0 ${x}px`;
      }

      requestAnimationFrame(() => {
        this.vShape.style.opacity = null;
        this.menuElement.style.opacity = null;
      });
    });
  },

  hideMenu() {
    let startTime = null;

    function resetStyling(t) {
      if (!startTime) {
        shareMenu.menuElement.style.opacity = "0";
        shareMenu.toggleButton.classList.remove("menu-shown");
        startTime = t;
      }

      if (t - startTime < 200) {
        requestAnimationFrame(resetStyling);
      } else {
        requestAnimationFrame(() => {
          shareMenu.menuElement.style.margin = null;
          shareMenu.menuElement.style.display = null;
          shareMenu.vShape.style.margin = null;
        });
      }
    }
    requestAnimationFrame(resetStyling);
  },

  toggleMenu() {
    if (this.isShowing) {
      this.hideMenu();
      this.isShowing = false;
    } else {
      this.showMenu();
      this.isShowing = true;
    }
  },
  init() {
    this.toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    this.menuElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      if (this.isShowing) {
        this.hideMenu();
        this.isShowing = false;
      }
    });

    window.addEventListener("resize", () => {
      if (this.isShowing) {
        this.hideMenu();
        this.isShowing = false;
      }
    });
  },
};

shareMenu.init();
