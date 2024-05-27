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

//ВОЗМОЖНОСТЬ ВЫБОРА ВРЕМЕНИ ТОЛЬКО В УКАЗАННОМ ИНТЕРВАЛЕ
function validateTimeInterval() {
  const input = document.getElementById("timeImterval");
  const selectedTime = input.value;

  const minTime = "10:00";
  const maxTime = "21:00";

  if (selectedTime < minTime || selectedTime > maxTime) {
    alert("Please select a time interval within " + minTime + " and " + maxTime);
    input.value = "";
  }
}

//ВОЗМОЖНОСТЬ ВЫБОРА ДАТЫ НЕ РАНЕЕ СЕГОДНЯШНЕЙ
// Получаем текущую дату
const currentDate = new Date().toISOString().split("T")[0];
// Находим элемент input по его ID
const dateInput = document.getElementById("guest-date");
// Устанавливаем минимальное значение для input равным текущей дате
dateInput.min = currentDate;

// GSAP АНИМАЦИЯ
// gsap.to - к какой точке анимация должна прийти из текущей
// gsap.from - из какой точки анимация начинает свое движение к текущей

// gsap.from(".header__menu-categories", {
//   scale: 0.7,
//   opacity: 0.5,
//   duration: 1,
// });

// gsap.from(".menu-social__items", {
//   scale: 0.7,
//   opacity: 0.5,
//   duration: 1,
// });

//from to - c какой позиции до какой будет анимация

const timeLine = gsap.timeline();
timeLine
  // Анимация для .header__menu-categories
  .from(".header__menu-categories", {
    scale: 0.7,
    opacity: 0.5,
    duration: 0.5,
  })
  // Анимация для .menu-social__items
  .from(".menu-social__items", {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
  })
  // Анимация для .welcome__title, .welcome__descr и .welcome__view-menu-button
  .fromTo(
    ".welcome__title, .welcome__descr, .welcome__view-menu-button",
    { opacity: 0, y: 50 }, // Начальные значения
    { opacity: 1, y: 0, duration: 1, stagger: 0.5 } // Конечные значения
  );

//анимация при скроле
gsap.registerPlugin(ScrollTrigger);

gsap.from(".contacts__address-list", {
  opacity: 0.5,
  scale: 0.7,
  duration: 2,
  // stagger: 0.5,
  scrollTrigger: {
    trigger: ".contacts__address",
    start: "top bottom", // Начать анимацию, когда центр элемента достигнет нижней границы вьюпорта
    end: "top top", // Закончить анимацию, когда центр элемента достигнет верхней границы вьюпорта
    scrub: true,
  },
});

gsap.from(".menu__list-item", {
  opacity: 0,
  xPercent: 40,
  duration: 2, // Длительность анимации
  stagger: 0.7, // Интервал между анимациями каждого элемента
  scrollTrigger: {
    trigger: ".menu__list",
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(".offers__banner-price", {
  xPercent: 30,
  yPercent: 10,
  scale: 1.3,
  duration: 0.5,
  yoyo: true,
  repeat: -1,
  // repeatDelay: 0,
  transformOrigin: "right",
});

gsap.from(
  ".popular__dish-item",
  {
    opacity: 0,
    yPercent: 40,
    duration: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".popular__dish-list",
      start: "top bottom", // Начать анимацию, когда центр элемента достигнет нижней границы вьюпорта
      end: "top top", // Закончить анимацию, когда центр элемента достигнет верхней границы вьюпорта
      scrub: true,
    },
  },
  1
);

gsap.from(".services__list-item", {
  opacity: 0.5,
  scale: 0.7,
  duration: 1,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".services__list",
    start: "center bottom", // Начать анимацию, когда центр элемента достигнет нижней границы вьюпорта
    end: "center center", // Закончить анимацию, когда центр элемента достигнет верхней границы вьюпорта
    scrub: true,
  },
});

gsap.to(".reservation__form-btn", {
  scale: 0.9,
  duration: 0.5,
  yoyo: true,
  repeat: -1,
  // repeatDelay: 0,
});

gsap.from(".footer__hashtag", {
  y: 100,
  opacity: 0,
  duration: 0.7,
  scrollTrigger: {
    trigger: ".footer__hashtag",
    start: "bottom bottom",
  },
});

gsap.from(".footer__inner .menu-social", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  scrollTrigger: {
    trigger: ".menu-social",
    start: "bottom bottom",
    delay: 1,
  },
});
