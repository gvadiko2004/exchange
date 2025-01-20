const swiperTesti = new Swiper(".swiper-testimonials", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  spaceBetween: 52,
  speed: 1200,

  autoplay: {
    delay: 3000,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 12,
    },
    440: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
  },
});
