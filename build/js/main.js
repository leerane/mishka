"use strict";

var BREAKPOINTS = {
  mobile: "768px",
  tablet: "768px",
  desktop: "1150px"
};

var toggleButton = document.querySelector(".js-toggle-button"),
  mainNav = document.querySelector(".main-header__bottom");


function loadShow() {
  toggleButton.classList.remove("visually-hidden");
}

function hideOnMedia(e) {
  if (e.matches) {
    mainNav.classList.remove("js-dropdown-navigation");
  } else {
    mainNav.classList.add("js-dropdown-navigation");
  }
}

var mediaEvent = window.matchMedia("(min-width: " + BREAKPOINTS.tablet.toString() + ")");
hideOnMedia(mediaEvent);
mediaEvent.addListener(hideOnMedia);

window.onload = loadShow;

toggleButton.addEventListener("click", function() {
  this.classList.toggle("js-toggle-button--close");
  mainNav.classList.toggle("js-dropdown-navigation--active");
});









