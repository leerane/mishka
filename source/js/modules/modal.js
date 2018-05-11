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
