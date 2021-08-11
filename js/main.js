"use strict";
const swiper = new Swiper(".swiper-container", {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  grabCursor: true,
  /*pagination: {
  el: ".swiper-pagination",
  clickable: true,
},*/
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
let login = localStorage.getItem("DVLStorage");
const authButton = document.querySelector(".button-auth");
const authModal = document.querySelector(".modal-auth");
const closeButtonAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const passwordInput = document.querySelector("#password");
const userName = document.querySelector(".user-name");
const outButton = document.querySelector(".button-out");
const cardsShop = document.querySelector(".cards-shop");
const containerPromo = document.querySelector(".container-promo");
const categories = document.querySelector(".categories");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

const shopTitle = document.querySelector(".restaurant-title");
const shopRating = document.querySelector(".rating");
const shopPrice = document.querySelector(".price");
const shopCategory = document.querySelector(".category");
const inputSearch = document.querySelector(".input-search");
const inputMain = document.querySelector(".input-address");
const modalBody = document.querySelector(".modal-body");
const modalPricetag = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

const cart = JSON.parse(localStorage.getItem(`delivery_${login}`)) || [];

function saveCart() {
  localStorage.setItem(`delivery_${login}`, JSON.stringify(cart));
}

function downloadCart() {
  if (localStorage.getItem(`delivery_${login}`)) {
    const data = JSON.parse(localStorage.getItem(`delivery_${login}`));
    cart.push(...data);
  }
}

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`error address >>> ${url} 
    status error >>> ${response.status}`); // sbrasyvaet oshibku
  }
  return await response.json();
};

// function validName(str) {
//   const regName = /^[a-zA-Z0-9-_\.]{1,20}$/;
//   return regName.test(str);
// }

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  authModal.classList.toggle("is-open");
  loginInput.style.borderColor = "";
  if (authModal.classList.contains("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function clearForm() {
  loginInput.style.borderColor = "";
}

function returnMain() {
  containerPromo.classList.remove("hide");
  categories.classList.remove("hide");
  menu.classList.add("hide");
  swiper.init();
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("DVLStorage");
    userName.textContent = login;
    authButton.style.display = "";
    userName.style.display = "";
    outButton.style.display = "";
    cartButton.style.display = "";
    outButton.removeEventListener("click", logOut);
    cart.length = 0;
    chekcAuth();
    returnMain();
  }
  userName.textContent = login;
  authButton.style.display = "none";
  userName.style.display = "inline";
  outButton.style.display = "flex";
  cartButton.style.display = "flex";

  outButton.addEventListener("click", logOut);
}

function notAuthorized() {
  function logIn(event) {
    event.preventDefault();
    loginInput.style.borderColor = "";
    if (loginInput.value) {
      login = loginInput.value;
      localStorage.setItem("DVLStorage", login);
      localStorage.setItem("f.login", JSON.stringify(login));
      toggleModalAuth();
      downloadCart();
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

function createCardShop({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery,
}) {
  const cardRest = document.createElement("a");
  cardRest.className = "card cat-shop";
  cardRest.products = products;
  cardRest.info = { kitchen, name, price, stars };

  const card = `
              <img src="${image}" alt="image" class="" />
              <div class="card-text">
                <!-- / card heading -->
                <div class="card-heading">
                  <h3 class="card-title">${name}</h3>
                  <span class="card-tag tag">${time_of_delivery}дней</span>
                </div>
                <!--card info -->
                <div class="card-info">
                  <div class="rating">${stars}</div>
                  <div class="price">${price} тнг</div>
                  <div class="category">${kitchen}</div>
                </div>
              </div>
  `;

  cardRest.insertAdjacentHTML("beforeend", card);
  cardsShop.insertAdjacentElement("beforeend", cardRest);
}

function createCardGood({ name, description, id, price, image }) {
  const card = document.createElement("div");
  card.id = id;
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `
            <img src="${image}" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart" id="${id}"
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price card-price-bold">${price} T</strong>
                </div>
              </div>
    `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;

  if (login) {
    const shop = target.closest(".cat-shop");
    if (shop) {
      containerPromo.classList.add("hide");
      swiper.destroy(false);
      categories.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";

      const { name, kitchen, price, stars } = shop.info;

      shopTitle.textContent = `${shop.info.name}`;
      shopRating.textContent = `${shop.info.stars}`;
      shopPrice.textContent = `От ${shop.info.price} Т`;
      shopCategory.textContent = `${shop.info.kitchen}`;
      //location.hash = `#${name}`;

      getData(`./db/${shop.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    }
  } else {
    toggleModalAuth();
  }
}

function addToCart(event) {
  const targety = event.target;
  const buttonAddToCart = targety.closest(".button-add-cart");
  if (buttonAddToCart) {
    const card = targety.closest(".card");
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const id = buttonAddToCart.id;
    const food = cart.find(function (item) {
      return item.id === id;
    });

    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1,
      });
    }
    saveCart();
  }
}

function renderCart() {
  modalBody.textContent = "";
  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `
      <div class="food-row">
            <span class="food-name">${title}</span>
            <strong class="food-price">${cost}</strong>
            <div class="food-counter">
              <button class="counter-button counter-minus" data-id="${id}">-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id="${id}">+</button>
            </div>
          </div>
        </div>`;

    modalBody.insertAdjacentHTML("beforeend", itemCart);
  });
  const totalPrice = cart.reduce(function (result, item) {
    //array
    return result + parseFloat(item.cost) * item.count;
  }, 0);

  modalPricetag.textContent = totalPrice + " T";
  saveCart();
}

function changeCount(event) {
  const target = event.target;
  if (target.classList.contains("counter-minus")) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    food.count--;
    renderCart();
    if (food.count < 1) {
      const index = cart.indexOf(food);
      if (index > -1) {
        cart.splice(index, 1);
      }
      renderCart();
    }
  }
  if (target.classList.contains("counter-plus")) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    food.count++;
    renderCart();
  }
}
//------------------------------------------------------------------------------------------
function init() {
  getData("./db/bd.json").then(function (data) {
    data.forEach(createCardShop);
  });

  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });
  buttonClearCart.addEventListener("click", function () {
    cart.length = 0;
    renderCart();
    toggleModal();
    saveCart();
  });
  modalBody.addEventListener("click", changeCount);
  cardsMenu.addEventListener("click", addToCart);
  close.addEventListener("click", toggleModal);
  cardsShop.addEventListener("click", openGoods);
  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    categories.classList.remove("hide");
    menu.classList.add("hide");
    swiper.init();
  });

  chekcAuth();

  //slider

  inputSearch.addEventListener("keyup", function (event) {
    console.log(event);
    if (event.charCode === 13) {
      const value = event.target.value.trim();
      if (!value) {
        event.target.style.backgroundColor = "red";
        event.target.value = "";
        setTimeout(function () {
          event.target.style.backgroundColor = "";
        }, 900);
        return;
      }
      getData("./db/partners.json")
        .then(function (data) {
          return data.map(function (part) {
            return part.products;
          });
        })
        .then(function (linksPorduct) {
          cardsMenu.textContent = "";
          linksPorduct.forEach(function (link) {
            getData(`./db/${link}`).then(function (data) {
              const resultSearch = data.filter(function (item) {
                const name = item.name.toLowerCase();
                return name.includes(value.toLowerCase());
              });

              containerPromo.classList.add("hide");
              swiper.destroy(false); // нужно передавать false
              categories.classList.add("hide");
              menu.classList.remove("hide");

              shopTitle.textContent = `Результат Поиска`;
              shopRating.textContent = ``;
              shopPrice.textContent = ``;
              shopCategory.textContent = ``;

              resultSearch.forEach(createCardGood);
            });
          });
        });
    }
  });

  inputMain.addEventListener("keyup", function (event) {
    console.log(event);
    const value = event.target.value.trim();
    if (!value && event.charCode === 13) {
      event.target.style.backgroundColor = "red";
      event.target.value = "";
      setTimeout(function () {
        event.target.style.backgroundColor = "";
      }, 900);
      return;
    }

    if (!/^[А-Яа-яЁё]$/.test(event.key)) {
      return;
    }

    getData("./db/bd.json")
      .then(function (data) {
        return data.map(function (part) {
          return part.products;
        });
      })
      .then(function (linksPorduct) {
        cardsMenu.textContent = "";
        linksPorduct.forEach(function (link) {
          getData(`./db/${link}`).then(function (data) {
            const resultSearch = data.filter(function (item) {
              const name = item.name.toLowerCase();
              return name.includes(value.toLowerCase());
            });

            containerPromo.classList.add("hide");
            swiper.destroy(false); // нужно передавать false
            categories.classList.add("hide");
            menu.classList.remove("hide");

            shopTitle.textContent = `Результат Поиска`;
            shopRating.textContent = ``;
            shopPrice.textContent = ``;
            shopCategory.textContent = ``;

            resultSearch.forEach(createCardGood);
          });
        });
      });
  });
}

init();
