import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import { sizesSlider } from "./sizes-slider.js";
import { sizes } from "./sizes.js";

console.log("v1 | BurgerMenu loader | 2026-07-24");

let burgerMenuInstance = null;

function initBurgerMenu() {
  if (burgerMenuInstance) return;

  const burgerEl = document.querySelector(".burger");
  if (!burgerEl) return;

  console.log("BurgerMenu: инициализация...");

  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
  });

  burgerMenuInstance = new BurgerMenu(
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

  console.log("BurgerMenu: готов");
}

const headerEl = document.getElementById("header");

function tryInit() {
  if (document.querySelector(".burger")) {
    initBurgerMenu();
    return true;
  }
  return false;
}

if (!tryInit()) {
  console.log("BurgerMenu: жду загрузки хедера...");
  const observer = new MutationObserver(() => {
    if (tryInit()) {
      console.log("BurgerMenu: хедер загружен, запускаю");
      observer.disconnect();
    }
  });
  if (headerEl) {
    observer.observe(headerEl, { childList: true, subtree: true });
  }
}

setTimeout(() => {
  if (!burgerMenuInstance) {
    console.log("BurgerMenu: резервный запуск...");
    tryInit();
  }
}, 500);

sizesSlider();
sizes();

window.openPopup = function (id) {
  document.getElementById(id).classList.add("open");
  document.body.classList.add("body--no-scroll");
};

window.closePopup = function (id) {
  document.getElementById(id).classList.remove("open");
  document.body.classList.remove("body--no-scroll");
};

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("popup__overlay")) {
    const popup = e.target.closest(".popup");
    if (popup) {
      popup.classList.remove("open");
      document.body.classList.remove("body--no-scroll");
    }
  }
});
