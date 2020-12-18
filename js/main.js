'use strict';


const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const cllose = document.querySelector(".close");



cartButton.addEventListener("click",toggleModal);
cllose.addEventListener("click",toggleModal)

function toggleModal() {
  modal.classList.toggle("is-open");
}
// day 1 
const authButton = document.querySelector('.button-auth');
const authModal = document.querySelector('.modal-auth');

function toggleModalAuth(){
  authModal.classList.toggle('is-open');
  console.log('hello')
}

console.dir(authModal)

authButton.addEventListener('click',toggleModalAuth)