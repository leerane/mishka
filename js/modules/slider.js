// Слайдер

// Отзывы
var quotesSwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
   delay: 3000,
   },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

quotesSwiper.init();

