import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import { sizesSlider } from "./sizes-slider.js";
import { sizes } from "./sizes.js";

function initBurgerMenu() {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
  });

  try {
    new BurgerMenu(
      {
        BURGER: "burger",
        BURGER_OPEN: "burger--open",
        HEADER_MENU: "header__menu",
        HEADER_MENU_OPEN: "header__menu--open",
        lABEL: {
          OPEN: "Открыть меню",
          CLOSE: "Закрыть меню",
        },
        PAGE_BODY: "body",
        PAGE_BODY_NO_SCROLL: "body--no-scroll",
        MENU_LINK: "menu__link",
        BREAKPOINT: 768,
        MAIN: "main",
      },
      headerFixed,
    );
  } catch (error) {
    console.warn("BurgerMenu: DOM-элементы ещё не загружены.");
  }
}

// Ждём загрузку хедера
const headerEl = document.getElementById("header");
if (headerEl && headerEl.innerHTML.trim()) {
  // Хедер уже загружен
  initBurgerMenu();
} else {
  // Ждём fetch
  const observer = new MutationObserver(() => {
    if (document.querySelector(".burger")) {
      initBurgerMenu();
      observer.disconnect();
    }
  });
  observer.observe(headerEl, { childList: true, subtree: true });
}

sizesSlider();
sizes();
