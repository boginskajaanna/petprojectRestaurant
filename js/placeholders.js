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
});
