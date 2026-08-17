export default class HeaderFixed {
  constructor(config) {
    this.headerTypes = config;
    this.header = document.querySelector(`.${this.headerTypes.HEADER}`);

    if (!this.header) {
      throw new Error("Header element is missing.");
    }

    // путь в одну сторону, после которого шапка прячется/появляется
    this.threshold = config.HIDE_THRESHOLD ?? 200;

    this.prevY = window.scrollY; // прошлая позиция (для шага)
    this.prevStep = 0; // направление прошлого шага: >0 вниз, <0 вверх
    this.anchorY = window.scrollY; // точка, где направление поменялось

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

    // у самого верха или пока открыто бургер-меню — шапка всегда видима,
    // иначе крестик закрытия уедет вместе с шапкой
    if (this.isMenuOpen() || y <= this.header.offsetHeight) {
      this.header.classList.remove(this.headerTypes.HEADER_HIDDEN);
      this.prevY = y;
      this.prevStep = 0;
      this.anchorY = y;
      return;
    }

    const step = y - this.prevY;

    // направление поменялось — новая точка отсчёта
    if ((step > 0 && this.prevStep < 0) || (step < 0 && this.prevStep > 0)) {
      this.anchorY = this.prevY;
    }
    if (step !== 0) {
      this.prevStep = step;
    }

    // сколько прошли в текущем направлении от точки разворота.
    // копим сумму, а не смотрим разовый скачок — поэтому работает
    // и на тачскрине, где каждое событие скролла даёт 1-3px
    const travel = y - this.anchorY;

    if (travel > this.threshold) {
      this.header.classList.add(this.headerTypes.HEADER_HIDDEN); // вниз
    } else if (travel < -this.threshold) {
      this.header.classList.remove(this.headerTypes.HEADER_HIDDEN); // вверх
    }

    this.prevY = y;
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
