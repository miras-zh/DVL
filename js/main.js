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

function clearForm() {
  loginInput.style.borderColor = "";
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

const cardsRestaurants = document.querySelector(".cards-restaurants");

function toggleModalAuth() {
  authModal.classList.toggle("is-open");
  loginInput.style.borderColor = "";
  if (authModal.classList.contains("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
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
    event.preventDefault();
    loginInput.style.borderColor = "";
    if (loginInput.value.trim()) {
      console.log("login");
      login = loginInput.value;

      localStorage.setItem("DVLStorage", login);
      localStorage.setItem("f.login", JSON.stringify(login));

      console.log(login);
      toggleModalAuth();
      authButton.removeEventListener("click", toggleModalAuth);
      closeButtonAuth.removeEventListener("click", toggleModalAuth);
      loginForm.removeEventListener("submit", logIn);
      loginForm.reset();
      loginInput.value = "";
      chekcAuth();
    } else {
      loginInput.style.borderColor = "red";
      setTimeout(() => {
        loginInput.value = "введите логин";
        loginInput.style.colorText = "red";
      }, 1);
      setTimeout(() => {
        loginInput.value = "";
        loginInput.style.colorText = "";
      }, 500);
      setTimeout(() => {
        loginInput.style.borderColor = "";
      }, 500);
    }
  }
  authButton.addEventListener("click", toggleModalAuth);
  authButton.addEventListener("click", clearForm);
  closeButtonAuth.addEventListener("click", toggleModalAuth);
  loginForm.addEventListener("submit", logIn);
  authModal.addEventListener("click", function (event) {
    console.log(event.target);
    if (event.target.classList.contains("is-open")) {
      toggleModalAuth();
    }
  });
}

function chekcAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
chekcAuth();

// day 2

function createCardReastaurant() {
  const card = `
          <a href="#" class="card card-restaurant">
              <img src="img/pizza-plus/preview.jpg" alt="image" class="" />
              <div class="card-text">
                <!-- / card heading -->
                <div class="card-heading">
                  <h3 class="card-title">Пицца Тануки</h3>
                  <span class="card-tag tag">40мин</span>
                </div>
                <!--card info -->
                <div class="card-info">
                  <div class="rating">5.0</div>
                  <div class="price">от 2000 тнг</div>
                  <div class="category">Пицца</div>
                </div>
              </div>
            </a>
  `;

  cardsRestaurants.insertAdjacentHTML("afterbegin", card);
}

createCardReastaurant();
