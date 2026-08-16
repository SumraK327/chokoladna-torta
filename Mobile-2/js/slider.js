export const Slider = () => {
  const sliderElement = document.querySelector(".swiper__container");

  if (!sliderElement) {
    return;
  }

  const slider = new Swiper(sliderElement, {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    grabCursor: true,
    slideToClickedSlide: true,
    autoHeight: true,

    mousewheel: {
      forceToAxis: true,
    },

    navigation: {
      prevEl: sliderElement.querySelector(".swiper__button--prev"),
      nextEl: sliderElement.querySelector(".swiper__button--next"),
    },

    pagination: {
      el: sliderElement.querySelector(".swiper__pagination"),
      clickable: true,
    },
  });
};
