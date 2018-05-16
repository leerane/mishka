if (document.querySelector(".main-map")) {
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
        url: "/img/svg/map-pin.svg",
        scaledSize: new google.maps.Size(67, 100)
      }
    });
  }

  function hideImageMap() {
    imageMap.classList.add("visually-hidden");
  }

  window.onload = hideImageMap;
  window.addEventListener("load", initMap);
}
