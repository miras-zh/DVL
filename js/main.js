'use strict';


const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
let auth = false;


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal)

function toggleModal() {
  modal.classList.toggle("is-open");
}
// day 1 
const authButton = document.querySelector('.button-auth');
const authModal = document.querySelector('.modal-auth');
const closeButtonAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');

function toggleModalAuth() {
  authModal.classList.toggle('is-open');
  console.log('hello')
}

console.dir(authModal)



function authorized() {
  console.log('autorized')
}

function notAuthorized() {
  console.log('not autorized');

  function logIn(){
    console.log('login')
  }

  authButton.addEventListener('click', toggleModalAuth);
  closeButtonAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit',logIn)
}

if (auth) {
  authorized();
} else {
  notAuthorized();
}