//SWIPER
const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    360: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    1120: {
      slidesPerView: 3,
    },
  },

  pagination: {
    el: ".swiper-pagination",
  },
});
