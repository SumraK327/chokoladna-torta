export const Slider = () => {
  const sliderElement = document.querySelector(".swiper__container");

  if (!sliderElement) {
    return;
  }

  let resumeTimeout = null;

  const slider = new Swiper(sliderElement, {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    grabCursor: true,
    slideToClickedSlide: true,
    autoHeight: true,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

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

  const pauseAutoplay = () => {
    slider.autoplay.stop();

    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
    }

    resumeTimeout = setTimeout(() => {
      slider.slideNext();
      slider.autoplay.start();
    }, 7000);
  };

  const nextButton = sliderElement.querySelector(".swiper__button--next");
  const prevButton = sliderElement.querySelector(".swiper__button--prev");
  const pagination = sliderElement.querySelector(".swiper__pagination");

  [nextButton, prevButton, pagination].forEach((el) => {
    if (el) {
      el.addEventListener("click", pauseAutoplay);
    }
  });

  slider.on("touchEnd", () => {
    if (slider.touches && slider.touches.diff !== 0) {
      pauseAutoplay();
    }
  });
};
