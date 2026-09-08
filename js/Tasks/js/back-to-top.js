export const BackToTop = () => {
  const backToTopBtn = document.querySelector(".controls__back-to-top");

  if (!backToTopBtn) {
    return;
  }

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
};
