//MOBILE MENU
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBtn = document.querySelector(".mobile-menu__btn");

mobileMenuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("mobile-menu--hidden");
});

//ПОДРУЗКА ЭЛЕМЕНТОВ ПОПУЛАР ДИШЕЗ ПО КЛИКУ НА КНОПКУ
let allItemsVisible = false;

// Функция для обновления видимых элементов в зависимости от текущего размера экрана
function updateVisibleItems() {
  const dishList = document.querySelector(".popular__dish-list");
  const dishItems = Array.from(dishList.children);
  const columns = getNumberOfColumns();

  // Определяем количество элементов, которые должны быть видимыми по умолчанию
  const defaultVisibleItems = columns;

  if (!allItemsVisible) {
    // Скрываем все элементы и показываем только необходимое количество
    dishItems.forEach((item, index) => {
      if (index < defaultVisibleItems) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    // Показываем кнопку "See all dishes", если есть скрытые элементы
    const button = document.querySelector("#seeAllDishes");
    if (dishItems.length > defaultVisibleItems) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }
}

// Функция для показа всех элементов по клику на кнопку "See all dishes"
function showAllItems() {
  const hiddenItems = document.querySelectorAll(".popular__dish-item.hidden");

  console.log("Button clicked, showing all items");

  // Показываем все скрытые элементы
  hiddenItems.forEach((item) => {
    item.classList.remove("hidden");
  });

  // Скрываем кнопку "See all dishes"
  document.querySelector("#seeAllDishes").style.display = "none";

  // Устанавливаем флаг, что все элементы видны
  allItemsVisible = true;
}

// Функция для определения количества колонок в текущем макете
function getNumberOfColumns() {
  const width = window.innerWidth;
  if (width <= 620) {
    return 2; // 2 колонки для ширины экрана до 620px
  } else if (width <= 910) {
    return 3; // 3 колонки для ширины экрана от 621px до 910px
  } else {
    return 4; // 4 колонки для ширины экрана больше 910px
  }
}

// Обновляем видимые элементы при загрузке страницы и изменении размера окна
window.addEventListener("load", updateVisibleItems);
window.addEventListener("resize", updateVisibleItems);

// Обработчик для кнопки "See all dishes"
document.querySelector("#seeAllDishes").addEventListener("click", showAllItems);




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



//ИНПУТЫ



//валидация значений вводимых в поле persons
document.addEventListener("DOMContentLoaded", function () {
  const guestQuantityInputs = document.querySelectorAll(".reservation__form-input-persons");

  guestQuantityInputs.forEach((input) => {
    input.addEventListener("input", function () {
      let value = this.value;
      if (!/^\d*$/.test(value)) {
        this.value = value.replace(/[^\d]/g, "");
      }
      if (value < 1) {
        this.value = 1;
      } else if (value > 50) {
        this.value = 50;
      }
    });

    input.addEventListener("blur", function () {
      let value = this.value;
      if (value < 1) {
        this.value = 1;
      } else if (value > 50) {
        this.value = 50;
      }
    });
  });
});


//ПЛЕЙСХОЛДЕРЫ НА ИНПУТЫ ДАТА И ВРЕМЯ
// document.getElementById("timeImterval").setAttribute("placeholder", "Select time");
// document.getElementById("guest-date").setAttribute("placeholder", "Select date");

document.addEventListener("DOMContentLoaded", function () {
  // Обработка для timeInput
  const timeInput = document.getElementById("timeImterval");
  const timePlaceholder = document.querySelector("#timeImterval + .placeholder");

  timeInput.addEventListener("focus", function () {
    timePlaceholder.classList.add("placeholder-hide");
  });

  timeInput.addEventListener("change", function () {
    if (!this.value) {
      timePlaceholder.classList.remove("placeholder-hide");
    } else {
      timePlaceholder.classList.add("placeholder-hide");
    }
  });

  // Обработка для dateInput
  const dateInput = document.getElementById("guest-date");
  const datePlaceholder = document.querySelector("#guest-date + .placeholder");

  dateInput.addEventListener("focus", function () {
    datePlaceholder.classList.add("placeholder-hide");
  });

  dateInput.addEventListener("change", function () {
    if (!this.value) {
      datePlaceholder.classList.remove("placeholder-hide");
    } else {
      datePlaceholder.classList.add("placeholder-hide");
    }
  });

  // Обработка для остальных инпутов
  const otherInputs = document.querySelectorAll(
    ".reservation__form-input:not(.reservation__form-input-time):not(.reservation__form-date)"
  );

  otherInputs.forEach((input) => {
    const placeholder = input.nextElementSibling;

    input.addEventListener("focus", function () {
      placeholder.classList.add("placeholder-hide");
    });

    input.addEventListener("input", function () {
      if (!this.value) {
        placeholder.classList.remove("placeholder-hide");
      } else {
        placeholder.classList.add("placeholder-hide");
      }
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        placeholder.classList.remove("placeholder-hide");
      }
    });
  });

  // Получаем форму по её ID
  const reservationForm = document.getElementById("reservationForm");

  // Обработчик события отправки формы
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    // Получаем значения полей времени и даты
    const timeValue = document.getElementById("timeImterval").value;
    const dateValue = document.getElementById("guest-date").value;

    // Проверяем, что поля времени и даты не пустые
    if (!timeValue || !dateValue) {
      // Выводим сообщение об ошибке или другое действие
      alert("Please select both time and date.");
    } else {
      // Отправляем данные формы на сервер
      sendData();
    }
  });

  // Функция для отправки данных формы на сервер
  function sendData() {
    const formData = new FormData(reservationForm);

    fetch("https://formspree.io/f/mgeggpbv", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          reservationForm.reset(); // Сбрасываем значения полей формы
          document.getElementById("reservationSuccessMessage").classList.add("show"); // Добавляем класс show
          resetPlaceholders(); // Восстанавливаем видимость плейсхолдеров
        } else {
          throw new Error("Oops! There was a problem submitting your form");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Функция для восстановления видимости плейсхолдеров
  function resetPlaceholders() {
    document.querySelectorAll(".placeholder").forEach((placeholder) => {
      placeholder.classList.remove("placeholder-hide");
    });
  }
});




//НАСТОЙКА ИНПУТОВ ДАТА И ВРЕМЯ С ПОМОЩЬЮ FTALPICKR
document.addEventListener("DOMContentLoaded", function () {
  // Настройка полей выбора времени и даты с помощью Flatpickr
  flatpickr(".reservation__form-input-time", {
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    disableMobile: true,
    minTime: "09:00",
    maxTime: "20:00",
    dateFormat: "H:i",
  });

  flatpickr(".reservation__form-date", {
    dateFormat: "Y-m-d",
    minDate: "today",
    defaultDate: null,
  });

  // Очистка значений инпутов по умолчанию при загрузке страницы (если нужно)
  const dateInput = document.querySelector(".reservation__form-date");
  const timeInput = document.querySelector(".reservation__form-input-time");

  dateInput.value = ""; // Очищаем значение даты
  timeInput.value = ""; // Очищаем значение времени

  // Получаем форму по её ID
  const reservationForm = document.getElementById("reservationForm");

  // Обработчик события отправки формы
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    // Получаем значения полей времени и даты
    const timeValue = document.getElementById("timeImterval").value;
    const dateValue = document.getElementById("guest-date").value;

    // Проверяем, что поля времени и даты не пустые
    if (!timeValue || !dateValue) {
      // Выводим сообщение об ошибке или другое действие
      alert("Please select both time and date.");
      return;
    }

    // Проверка времени на соответствие заданному интервалу
    const minTime = "09:00";
    const maxTime = "20:00";

    if (timeValue < minTime || timeValue > maxTime) {
      alert(`Please select a time between ${minTime} and ${maxTime}.`);
      return;
    }

    // Отправляем данные формы на сервер
    sendData();
  });

  // Функция для отправки данных формы на сервер
  function sendData() {
    const formData = new FormData(reservationForm);

    fetch("https://formspree.io/f/mgeggpbv", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          reservationForm.reset(); // Сбрасываем значения полей формы
          document.getElementById("reservationSuccessMessage").classList.add("show"); // Добавляем класс show
        } else {
          throw new Error("Oops! There was a problem submitting your form");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});


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
  scale: 0.5,
  duration: 2,
  stagger: 0.5,
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
  x: 10,
  y: 10,
  scale: 1.15,
  duration: 0.5,
  yoyo: true,
  repeat: -1,
  // repeatDelay: 0,
  transformOrigin: "left",
});

// gsap.from(
//   ".popular__dish-item",
//   {
//     opacity: 0,
//     yPercent: 40,
//     duration: 1,
//     stagger: 0.5,
//     scrollTrigger: {
//       trigger: ".popular__dish-list",
//       start: "top bottom", // Начать анимацию, когда центр элемента достигнет нижней границы вьюпорта
//       end: "top top", // Закончить анимацию, когда центр элемента достигнет верхней границы вьюпорта
//       scrub: true,
//     },
//   },
//   1
// );

gsap.from(".services__list-item", {
  opacity: 0.5,
  scale: 0.7,
  duration: 1,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".services__list",
    start: "center bottom", // Начать анимацию, когда центр элемента достигнет нижней границы вьюпорта
    end: "center top", // Закончить анимацию, когда центр элемента достигнет верхней границы вьюпорта
    // scrub: true,
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
