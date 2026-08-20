import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import { Slider, BestSlider } from "./slider.js";

try {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
    HEADER_HIDDEN: "header--hidden",
    PAGE_BODY_NO_SCROLL: "body--no-scroll",
    HIDE_THRESHOLD: 200, // px в одну сторону до скрытия/появления шапки
  });

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
      PAGE_BODY: "html",
      PAGE_BODY_NO_SCROLL: "body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 768,
    },
    headerFixed,
  );

  BestSlider();

  // Поиск: клик по тегу — его текст подставляется в строку поиска
  const searchTags = document.querySelector(".search__tags");
  const searchInput = document.querySelector(".search__input");

  if (searchTags && searchInput) {
    searchTags.addEventListener("click", (event) => {
      const tag = event.target.closest(".search__tag");
      if (!tag) return;

      searchInput.value = tag.textContent.trim();
      searchInput.focus();
    });
  }

  fetch("intro-swiper.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("intro-swiper").innerHTML = html;
      Slider();
    })
    .catch(() => {
      Slider();
    });
} catch (error) {
  console.error(error);
}
