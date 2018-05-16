/*
var inputControl = document.querySelectorAll(".input__control, .textarea__control"),
  inputPlaceholderClass = "js-placeholder",
  currentForm = document.querySelector(".order-form"),
  orderFormButton = document.querySelector(".js-order-button"),
  requiredFields = Array.prototype.slice.call(currentForm.querySelectorAll("[required]")),
  inputControlArray = Array.prototype.slice.call(inputControl);

function setDataPlaceholder() {
  this.forEach(createDataPlaceholder);
}

function createDataPlaceholder(e) {
  var input = e;
  function getDataPlaceholder(item) {
    var attr = "placeholder";
    var value = item.getAttribute(attr);
    item.setAttribute("data-placeholder", value);
    item.removeAttribute(attr);
    item.classList.add(inputPlaceholderClass);
    var placeholderValue = item.dataset.placeholder;
    item.value = placeholderValue;
  }
  getDataPlaceholder(input);

  function focusPlaceholder(item) {
    item.onfocus = function () {
      if (item.classList.contains(inputPlaceholderClass)) {
        item.classList.remove(inputPlaceholderClass);
        item.value = "";
      }
    }
  }
  focusPlaceholder(input);

  function blurPlaceholder(item) {
    item.onblur = function () {
      if (!item.value) {
        item.classList.add(inputPlaceholderClass);
        item.value = item.dataset.placeholder;
      }
    }
  }
  blurPlaceholder(input);
}

setDataPlaceholder.call(inputControlArray);
*/
