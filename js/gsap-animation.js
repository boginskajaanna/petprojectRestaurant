const timeLine = gsap.timeline();
timeLine
  .from(".header__menu-categories", {
    scale: 0.7,
    opacity: 0.5,
    duration: 0.5,
  })
  .from(".menu-social__items", {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
  })
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
  duration: 2, 
  stagger: 0.7,
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
  transformOrigin: "left",
});

gsap.from(".services__list-item", {
  opacity: 0.5,
  scale: 0.7,
  duration: 1,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".services__list",
    start: "center bottom", 
    end: "center top",
    // scrub: true,
  },
});

gsap.to(".reservation__form-btn", {
  scale: 0.9,
  duration: 0.5,
  yoyo: true,
  repeat: -1,
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
