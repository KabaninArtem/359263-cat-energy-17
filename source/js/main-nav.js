var header = document.querySelector('.header');
var map = document.querySelector('.map');
var navMain = document.querySelector('.main-nav');
var toggle = document.querySelector('.header__toggle');

navMain.classList.remove('main-nav--nojs');
map.classList.remove('map--nojs');

toggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    toggle.classList.add('header__toggle--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    toggle.classList.remove('header__toggle--opened');

  }
});
