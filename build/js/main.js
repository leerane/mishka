var imageMap = document.querySelector(".main-map__image-wrapper");

function initMap() {
  var uluru = {lat: 59.938939, lng: 30.323186};
  var map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: {
      url: "../img/svg/map-pin.svg",
      scaledSize: new google.maps.Size(67, 100)
    }
  });
}

window.onload = hideImageMap;

function hideImageMap() {
  imageMap.classList.add("visually-hidden");
}

window.addEventListener("load", initMap);


var modalOverlay = document.querySelector(".modal-overlay"),
  modalCart = modalOverlay.querySelector(".modal-cart"),
  modalButton = document.querySelector(".js-modal-button");

modalButton.addEventListener("click", function () {
  modalOverlay.classList.add("modal-overlay--open");
  modalCart.classList.add("modal-cart--open");
  document.body.style.overflow = "hidden";
});

/*window.addEventListener("click", function (e) {
  if (e.target !== modalCart) {
    modalOverlay.classList.add("visually-hidden");
  }
});*/

"use strict";

var BREAKPOINTS = {
  mobile: "768px",
  tablet: "768px",
  desktop: "1150px"
};

var toggleButton = document.querySelector(".js-hamburger-button"),
  mainNav = document.querySelector(".main-navigation__bottom");


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

window.addEventListener("load", loadShow);

toggleButton.addEventListener("click", function() {
  this.classList.toggle("hamburger-button--close");
  mainNav.classList.toggle("js-dropdown-navigation--active");
});









