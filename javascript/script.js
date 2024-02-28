"use strict";

// the button to select the category
let filterCategory = document.querySelector(".displayFilter");
// the button to select the currency
let currencyOptions = document.querySelector(".currencySelector");
// Just a variable wrapper to display the timer
const screenDate = document.querySelector(".wrapp-intro-time");
// The html container which displayed the products inside of it
let productsWrapper = document.querySelector(".productsWrapper");
// Currencyfactor to multiply and change the currency values
let currencyFactor = 1;

// just to display CAD or CLP
let moneySign = "";
// the arrays to insert each value (product)
const storeItems = [];
const cartItems = [];
let currentFlag = document.querySelector(".current-flag");

// Class constructor for products
class storeItem {
  constructor(
    id,
    name,
    moneySign,
    price,
    description,
    quantityAvailable,
    maxOrder,
    category,
    deliveryCost,
    reviews,
    picture
  ) {
    this.id = id;
    this.name = name;
    this.moneySign = moneySign;
    this.price = price;
    this.description = description;
    this.quantityAvailable = quantityAvailable;
    this.maxOrder = maxOrder;
    this.category = category;
    this.deliveryCost = deliveryCost;
    this.reviews = reviews;
    this.picture = picture;
  }
}

// Function to update the currency
const updateCurrency = function () {
  if (currencyOptions.value == "CAD") {
    currencyFactor = 1;
    moneySign = "CAD";
    currentFlag.src = "images/canada.png";
  } else if (currencyOptions.value == "CLP") {
    currencyFactor = 711.8;
    moneySign = "CLP";
    currentFlag.src = "images/chile.png";
  }

  displayStoreItems();
};

// Function to update the filter //STILL FIGURING OUT ??????????????????????????????????????????
// const updateFilter = function () {
//   if (filterCategory.value == "carseat") {
//   } else if (filterCategory.value == "strollers") {
//   } else if (filterCategory.value == "crib") {
//   } else {
//   }

//   displayStoreItems();
// };

//display items
const displayStoreItems = function () {
  let productsHTML = "";

  storeItems.forEach(function (product) {
    // Format the price according to the right currency
    let formattedPrice = (product.price * currencyFactor).toLocaleString(
      undefined,
      {
        // style: "currency",
        currency: moneySign,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    // Insert in each iteration
    let productHTML = `
    <tr>
    <td class="product-id">${product.id}</td>
    <td class="product-name">${product.name}</td>
    <td class="product-price">$ ${formattedPrice} ${moneySign}</td>
    <td class="product-descr">${product.description}</td>
    <td class="product-qty">${product.quantityAvailable}</td>
    <td class="product-max">${product.maxOrder}</td>
    <td class="product-cat">${product.category}</td>
    <td class="product-photo">${product.picture}</td>
  </tr>
      `;

    productsHTML += productHTML;
  });

  productsWrapper.innerHTML = productsHTML;
};

// original function load
const loadPage = function () {
  // default values for the first time it loads
  moneySign = "CAD";

  screenDate.innerHTML = new Date();
  // Defining the currency type
  currencyOptions.addEventListener("change", updateCurrency);
  // Defining the filter category
  // filterCategory.addEventListener("change", updateFilter);

  let product1 = new storeItem(
    "PID01",
    "car seat advocate",
    `${moneySign}`,
    345,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    115,
    3,
    "car seat",
    null,
    null,
    '<img class="product-image" src="images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
  );

  let product2 = new storeItem(
    "PID02",
    "car seat advocate",
    `${moneySign}`,
    231.34,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    472,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="images/car-seat-convertible-grow-and-go.png" alt=" Sport number two" />'
  );

  let product3 = new storeItem(
    "PID03",
    "crib luna",
    `${moneySign}`,
    987.13,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    1115,
    3,
    "crib",
    null,
    null,
    '<img class="product-image" src="images/crib-luna.png" alt=" Sport number two" />'
  );

  let product4 = new storeItem(
    "PID04",
    "stroller forest",
    `${moneySign}`,
    222.99,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    472,
    10,
    "Stroller",
    null,
    null,
    '<img class="product-image" src="images/stroller-forest.png" alt=" Sport number two" />'
  );

  let product5 = new storeItem(
    "PID05",
    "crib essential",
    `${moneySign}`,
    342,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    79,
    5,
    "crib",
    null,
    null,
    '<img class="product-image" src="images/crib-essential.png" alt=" Sport number two" />'
  );

  let product6 = new storeItem(
    "PID06",
    "stroller spark",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="images/stroller-spark.png" alt=" Sport number two" />'
  );

  storeItems.push(product1, product2, product3, product4, product5, product6);
  displayStoreItems();
};

document.addEventListener("DOMContentLoaded", loadPage);

/**
 I am basically stuck in filtering by category and the rest of the project, just the first table done
 */
