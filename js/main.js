'use strict';


const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click",toggleModal)
close.addEventListener("click",toggleModal)

const toggleModal = function() {
  modal.classList.toggle("is-open");
}
