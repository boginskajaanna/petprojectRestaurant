//MOBILE MENU
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBtn = document.querySelector(".mobile-menu__btn");

mobileMenuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("mobile-menu--hidden");
});
