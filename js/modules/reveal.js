// ScrollReveal
var sr = ScrollReveal();
var RevealData = {
  DURATION: 1000,
  INTERVAL: 60,
  DISTANCE: '10px'
};

// Общее

// Промо, подвал, навигация
sr.reveal('.promo-things__title, .main-footer, ' +
  '.main-navigation__item, .main-navigation__text', {
  viewFactor: 0.5,
  easing: 'ease-in-out',
  duration: RevealData.DURATION - 500,
  opacity: 0
});

// Главная страница

// Товар недели, о нас, отзывы, контакты, карта
sr.reveal('.best-product__top > *, .best-product__middle > *, .about-us__title, ' +
  '.about-us__item, .impressions__title, .impressions__blockquote, ' +
  '.contact__title, .contact__description, .main-map', {
  viewFactor: 0.5,
  easing: 'ease-in-out',
  distance: RevealData.DISTANCE,
  origin: 'bottom',
  duration: RevealData.DURATION - 500,
  opacity: 0,
  interval: RevealData.INTERVAL
});

// Кнопки слайдера, контакта
sr.reveal('.impressions__button-wrapper, .impressions__buttons-wrapper, ' +
  '.contact__button-wrapper, .promo-things__title', {
  viewFactor: 0.5,
  easing: 'ease-in-out',
  duration: RevealData.DURATION - 500,
  opacity: 0,
  interval: RevealData.INTERVAL
});

// Страница с формой

// Форма
sr.reveal('.order-page__inner > *', {
  viewFactor: 0,
  easing: 'ease-in-out',
  distance: RevealData.DISTANCE,
  origin: 'bottom',
  duration: RevealData.DURATION - 500,
  opacity: 0,
  interval: RevealData.INTERVAL
});

// Каталог товаров

// Карточки товаров, видео
sr.reveal('.products__item, .catalog-video', {
  viewFactor: 0,
  easing: 'ease-in-out',
  distance: RevealData.DISTANCE,
  origin: 'bottom',
  duration: RevealData.DURATION - 500,
  opacity: 0,
  interval: RevealData.INTERVAL
});
