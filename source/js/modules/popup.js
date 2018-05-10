var modalOverlay = document.querySelector(".modal-overlay");

function modalOverlayShow() {
  modalOverlay.classList.remove("visually-hidden");
  document.body.style.overflow = "hidden";
}

window.addEventListener("load", modalOverlayShow);
