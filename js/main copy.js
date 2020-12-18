'use strict';

// Slider

const optionSlider = {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'coverflow',
};

const swiper = new Swiper('.swiper-container', optionSlider)

const RED_COLOR = '#ff0000';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const closeAuth = document.querySelector('.close-auth');
const modalAuth = document.querySelector('.modal-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title')
const restaurantRating = document.querySelector('.rating')
const restaurantPrice = document.querySelector('.price')
const restaurantCategory = document.querySelector('.category')
const inputAddress = document.querySelector('.input-address');
const inputSearch = document.querySelector('.input-search');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');


let login = localStorage.getItem('gloDelivery');

const cart = JSON.parse(localStorage.getItem(`gloDelivery_${login}`)) || [];

function saveCart() { 
  localStorage.setItem(`gloDelivery_${login}`, JSON.stringify(cart));
}

function downloadCart() {
  if (localStorage.getItem(`gloDelivery_${login}`)) {
    const data = JSON.parse(localStorage.getItem(`gloDelivery_${login}`));
    cart.push(...data)
  }
}

const getData = async function(url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус: ${response.status}`);
  }

  return response.json();

};

const validName = function(str) {
  const regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/;
  return regName.test(str);
}

const toggleModal = function() {
  modal.classList.toggle("is-open");
}

const toggleModalAuth = function() {
  modalAuth.classList.toggle("is-open");
  if (modalAuth.classList.contains("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
}

const clearForm = function() { 
  loginInput.style.borderColor = '';
  logInForm.reset();  
}

function returnMain() {
  containerPromo.classList.remove('hide');
  swiper.init(optionSlider);
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function authorized() {
  function logOut() {
    login = null;
    cart.length = 0;
    localStorage.removeItem('gloDelivery')
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
    returnMain();
  }

  userName.textContent = login; 

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  cartButton.style.display = 'flex';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {  
  function logIn(event) {
    event.preventDefault();
    
    if (validName(loginInput.value)) {
      login = loginInput.value;
      localStorage.setItem('gloDelivery', login)
      toggleModalAuth();
      downloadCart()
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn)
      logInForm.reset();
      checkAuth();
    } else {
      loginInput.style.borderColor = RED_COLOR;
      loginInput.value = '';
    }
    
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function (event) { 
    if (event.target.classList.contains('is-open')) {
      toggleModalAuth()
    }
  })
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurant({ image, kitchen, name, 
  price, stars, products, time_of_delivery: timeOfDelivery }) {

  const cardRestaurant = document.createElement('a');
  cardRestaurant.classList.add('card', 'card-restaurant');
  cardRestaurant.products = products;
  cardRestaurant.info = { kitchen, name, price, stars };

  const card = `
    <img src=${image} alt=${name} class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  `;

  cardRestaurant.insertAdjacentHTML('beforeend', card);
  cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurant);
}



function createCardGood({ description, id, image, name, price }) {


  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;

  card.insertAdjacentHTML('beforeend', `
    <img src=${image} alt=${name} class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <p class="ingredients">${description}</p>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {
  const target = event.target;

  if (login) {
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      swiper.destroy(false);
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      const { name, kitchen, price, stars } = restaurant.info;

      restaurantTitle.textContent = name;
      restaurantRating.textContent = stars;
      restaurantPrice.textContent = `От ${price} ₽`;
      restaurantCategory.textContent = kitchen;

      getData(`./db/${restaurant.products}`).then(function(data) {
        data.forEach(createCardGood);
      })
    }
  } else {
    toggleModalAuth();
  }  
}

function addToCart(event) {
  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = card.id;

    const food = cart.find(function (item) { 
      return item.id === id;
    });

    if (food) {
      food.count++
    } else {
      cart.push({ title, cost, id, count: 1 });
    }

    
    saveCart();
  }
}

function renderCart() {
  modalBody.textContent = '';
  cart.forEach(function({ title, cost, id, count }) {
    const itemCart = `
      <div class="food-row">
        <span class="food-name">${title}</span>
        <strong class="food-price">${cost} ₽</strong>
        <div class="food-counter">
          <button class="counter-button counter-minus" data-id=${id}>-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id=${id}>+</button>
        </div>
      </div>
    `;

    modalBody.insertAdjacentHTML('afterbegin', itemCart);
  });

  const totalPrice = cart.reduce(function(res, item) {
    return res + (parseFloat(item.cost) * item.count);
  }, 0);

  modalPrice.textContent = totalPrice + ' ₽';
  saveCart();
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find(function(item) {
      return item.id === target.dataset.id;
    });

    if (target.classList.contains('counter-minus')) {
      food.count--
      if (!food.count) {
        cart.splice(cart.indexOf(food), 1);
      }
    };
    if (target.classList.contains('counter-plus')) food.count++;

    renderCart();
  }
}

function searchHandler(event) {

  const value = event.target.value.trim();

  if (!value && event.charCode === 13) {
    event.target.style.backgroundColor = RED_COLOR;
    event.target.value = '';
    setTimeout(function() {
      event.target.style.backgroundColor = '';
    }, 1500)
    return;
  }

  if(!/^[А-Яа-яЁё]$/.test(event.key)) {
    console.log(event.key);
    return;
  }

  if (value.length < 3) return;

  getData('./db/partners.json')
    .then(function (data) {
      return data.map(function(partner) {
        return partner.products;          
      });
    })
    .then(function (linksProduct) { 
      cardsMenu.textContent = '';
      
      linksProduct.forEach(function(link) {
        getData(`./db/${link}`)
          .then(function (data) {
            
            const resultSearch = data.filter(function (item) { 
              const name = item.name.toLowerCase();
              return name.includes(value.toLowerCase());
            })

            containerPromo.classList.add('hide');
            swiper.destroy(false);
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = 'Результат поиска';
            restaurantRating.textContent = '';
            restaurantPrice.textContent = '';
            restaurantCategory.textContent = 'разная кухня';
            
            resultSearch.forEach(createCardGood);
          })
      })
    })
  
}

function init() {
  getData('./db/partners.json').then(function(data) {
    data.forEach(createCardRestaurant);
  })
  
  buttonAuth.addEventListener('click', clearForm);
  cardsMenu.addEventListener('click', addToCart);
  cardsRestaurants.addEventListener('click', openGoods);
  modalBody.addEventListener('click', changeCount);
  close.addEventListener("click", toggleModal);

  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });

  buttonClearCart.addEventListener('click', function () {
    cart.length = 0;
    renderCart();
    toggleModal();
  });
  
  logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    swiper.init(optionSlider);
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  
  inputSearch.addEventListener('keyup', searchHandler);
  inputAddress.addEventListener('keyup', searchHandler);
  checkAuth();
}



init();











