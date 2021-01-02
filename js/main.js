"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
let login = localStorage.getItem("DVLStorage");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
// day 1
const authButton = document.querySelector(".button-auth");
const authModal = document.querySelector(".modal-auth");
const closeButtonAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const passwordInput = document.querySelector("#password");

const userName = document.querySelector(".user-name");
const outButton = document.querySelector(".button-out");

function toggleModalAuth() {
  authModal.classList.toggle("is-open");
}

console.dir(authModal);

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("DVLStorage");
    userName.textContent = login;
    authButton.style.display = "";
    userName.style.display = "";
    outButton.style.display = "";
    outButton.removeEventListener("click", logOut);
    chekcAuth();
  }
  console.log("autorized");
  userName.textContent = login;
  authButton.style.display = "none";
  userName.style.display = "inline";
  outButton.style.display = "block";
  outButton.addEventListener("click", logOut);
}

function notAuthorized() {
  console.log("not autorized");

  function logIn(event) {
    if (loginInput.value) {
        console.log("login");
        event.preventDefault();
        login = loginInput.value;

        localStorage.setItem("DVLStorage", login);
        localStorage.setItem("f.login", JSON.stringify(login))

        console.log(login);
        toggleModalAuth();
        authButton.removeEventListener("click", toggleModalAuth);
        closeButtonAuth.removeEventListener("click", toggleModalAuth);
        loginForm.removeEventListener("submit", logIn);
        loginForm.reset();
        loginInput.value = "";
        chekcAuth();
    } else
     {
      console.log('не ввели логин или пароль')
    }
  }

  authButton.addEventListener("click", toggleModalAuth);
  closeButtonAuth.addEventListener("click", toggleModalAuth);
  loginForm.addEventListener("submit", logIn);
}

function chekcAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}



chekcAuth();


const a_object = {
  hi: 'hello worls'
}

let test_obj = null;

localStorage.setItem('store', JSON.stringify(a_object));
test_obj = JSON.parse(localStorage.getItem('store'));
console.log('test object >> ' + test_obj)