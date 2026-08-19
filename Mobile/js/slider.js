import Swiper from "../swiper/swiper-bundle.min.mjs";

export const Slider = () => {
  const sliderElement = document.querySelector(".swiper__container");
  if (!sliderElement) {
    return;
  }

  new Swiper(sliderElement, {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    speed: 700,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
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

export const BestSlider = () => {
  const sliderElement = document.querySelector(".best__slider");
  if (!sliderElement) {
    return;
  }

  new Swiper(sliderElement, {
    slidesPerView: 1,
    spaceBetween: 28,
    loop: true,
    grabCursor: true,
    speed: 700,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    mousewheel: {
      forceToAxis: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },

    navigation: {
      prevEl: sliderElement.querySelector(".best__button--prev"),
      nextEl: sliderElement.querySelector(".best__button--next"),
    },
  });
};
