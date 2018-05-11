var modalOverlay = document.querySelector(".modal-overlay"),
  modalCart = modalOverlay.querySelector(".modal-cart"),
  modalButtons = document.querySelectorAll(".js-modal-button");
  modalButtonArray = Array.prototype.slice.call(modalButtons);

  modalButtonArray.forEach(function(el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      modalOverlay.classList.remove("visually-hidden");
      modalOverlay.classList.add("modal-overlay--open");
      modalCart.classList.add("modal-cart--open");
      document.body.style.overflow = "hidden";
      if (modalCart.classList.contains("modal-cart--open")) {
        window.addEventListener("click", function (e) {
          if (e.target === modalOverlay) {
            document.body.style.overflow = "visible";
            modalOverlay.classList.remove("modal-overlay--open");
            modalCart.classList.remove("modal-cart--open");
          }
        });
      }
    });
  });



