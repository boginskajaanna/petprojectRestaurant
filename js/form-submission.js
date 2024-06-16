document.addEventListener("DOMContentLoaded", function () {
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
