import HeaderFixed from "./header.js";
import BurgerMenu, { initBurgerMenu } from "./burger.js";
import { Todo } from "./todo.js";
import { BackToTop } from "./back-to-top.js";

try {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
  });

  initBurgerMenu(headerFixed);
} catch (error) {
  console.warn("Header/Burger:", error);
}

try {
  Todo();
} catch (error) {
  console.warn("Todo:", error);
}

try {
  BackToTop();
} catch (error) {
  console.warn("BackToTop:", error);
}
