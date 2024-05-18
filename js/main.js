

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

function validateTimeInterval() {
  const input = document.getElementById("timeImterval");
  const selectedTime = input.value;

  const minTime = '10:00';
  const maxTime = '21:00';

  if (selectedTime < minTime || selectedTime > maxTime) {
    alert('Please select a time interval within ' + minTime + ' and ' + maxTime);
    input.value = '';
  }
}