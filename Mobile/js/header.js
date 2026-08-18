export default class HeaderFixed {
  constructor(config) {
    this.headerTypes = config;
    this.header = document.querySelector(`.${this.headerTypes.HEADER}`);

    if (!this.header) {
      throw new Error("Header element is missing.");
    }

    this.initEvents();
  }

  initEvents() {
    window.addEventListener("scroll", this.updateFixedClass.bind(this), {
      passive: true,
    });
  }

  updateFixedClass() {
    const y = window.scrollY;

    // тень, когда отъехали от верха
    if (y > 0) {
      this.header.classList.add(this.headerTypes.HEADER_FIXED);
    } else {
      this.header.classList.remove(this.headerTypes.HEADER_FIXED);
    }

    // Шапка остаётся видимой при любом направлении прокрутки.
  }

  isMenuOpen() {
    return document.body.classList.contains(
      this.headerTypes.PAGE_BODY_NO_SCROLL,
    );
  }

  removeFixedClass() {
    this.header.classList.remove(this.headerTypes.HEADER_FIXED);
  }
}
