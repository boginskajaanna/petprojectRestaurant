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
