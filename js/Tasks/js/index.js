import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import { Todo } from "./todo.js";

try {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
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
      PAGE_BODY: "body",
      PAGE_BODY_NO_SCROLL: "body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 768,
    },
    headerFixed,
  );

  Todo(); // ← вызов ежедневника

  const backToTopBtn = document.querySelector(".controls__back-to-top");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    const toggleBackToTop = () => {
      if (window.scrollY > 200) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    };

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();
  }
} catch (error) {
  console.error(error);
}
