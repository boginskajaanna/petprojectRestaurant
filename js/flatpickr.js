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
