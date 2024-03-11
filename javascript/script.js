"use strict";

// the button to select the category
let filterCategory = document.querySelector(".displayFilter");
// the button to select the currency
let currencyOptions = document.querySelector(".currencySelector");
// Just a variable wrapper to display the timer
const screenDate = document.querySelector(".wrapp-intro-time");
// The HTML container which displayed the products inside of it
let productsWrapper = document.querySelector(".productsWrapper");
// Currency factor to multiply and change the currency values
let currencyFactor = 1;
// Currency flag
let currentFlag = document.querySelector(".current-flag");
// Button to add to the cart
const add_to_cart_btn = document.querySelector(".btnAddItem");
// Button to remove from the cart
const remove_from_cart_btn = document.querySelector(".btnremoveItem");

// Just to display CAD or CLP
let moneySign = "";
// The arrays to insert each value (product)
const array_of_store_items = [];
const array_of_cart_items = [];

const cart_output = document.querySelector("#cartOutput");
const cart_checkout = document.querySelector("#cartCheckout");

// Class constructor for products
class item_constructor {
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

const function_display_items = function (products) {
  let productsHTML = "";

  products.forEach(function (store_item) {
    // Format the price according to the right currency
    let formattedPrice = (store_item.price * currencyFactor).toLocaleString(
      undefined,
      {
        style: "currency",
        currency: moneySign,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    // Insert in each iteration
    let productHTML = `
      <tr>
        <td class="product-id">${store_item.id}</td>
        <td class="product-name">${store_item.name}</td>
        <td class="product-price">${formattedPrice}</td>
        <td class="product-descr">${store_item.description}</td>
        <td class="product-qty">${store_item.quantityAvailable}</td>
        <td class="product-max">${store_item.maxOrder}</td>
        <td class="product-cat">${store_item.category}</td>
        <td class="product-photo">${store_item.picture}</td>
      </tr>
    `;

    productsHTML += productHTML;
  });

  productsWrapper.innerHTML = productsHTML;
};

filterCategory.addEventListener("change", function () {
  const selectedCategory = filterCategory.value.toLowerCase().trim();

  // Filtra los productos basados en la categoría seleccionada
  const filteredProducts = array_of_store_items.filter(function (product) {
    const productCategory = product.category.toLowerCase().trim();
    return selectedCategory === "all" || productCategory === selectedCategory;
  });

  // Muestra los productos filtrados en la página
  function_display_items(filteredProducts);
});

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

  function_display_items();
};

// Original function load
const loadPage = function () {
  // Default values for the first time it loads
  moneySign = "CAD";

  screenDate.innerHTML = new Date();
  // Defining the currency type
  currencyOptions.addEventListener("change", updateCurrency);

  let car_seat_advocate = new item_constructor(
    "001",
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

  let car_seat_grow_and_go = new item_constructor(
    "002",
    "car seat Grow and Go",
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

  let criba_luna = new item_constructor(
    "003",
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

  let stroller_forest = new item_constructor(
    "004",
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

  let crib_essential = new item_constructor(
    "005",
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

  let car_seat_beryl = new item_constructor(
    "006",
    "car seat beryl",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="images/car-seat-convertible-beryl.png" alt=" Sport number two" />'
  );

  let car_seat_giro = new item_constructor(
    "007",
    "car seat i-giro",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="images/car-seat-convertible-i-giro.png" alt=" Sport number two" />'
  );

  let car_seat_one_4life = new item_constructor(
    "008",
    "car seat one4life",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="images/car-seat-convertible-one4life.png" alt=" Sport number two" />'
  );

  let crib_alessia = new item_constructor(
    "009",
    "crib alessia",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="images/crib-alessia.png" alt=" Sport number two" />'
  );

  let crib_beyond = new item_constructor(
    "0010",
    "crib beyond",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="images/crib-beyond.png" alt=" Sport number two" />'
  );

  let crib_dream = new item_constructor(
    "0011",
    "crib dream",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="images/crib-dream.png" alt=" Sport number two" />'
  );

  let stroller_epic = new item_constructor(
    "0012",
    "stroller epic",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="images/stroller-epic.png" alt=" Sport number two" />'
  );

  let stroller_spark = new item_constructor(
    "0013",
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

  let stroller_francis = new item_constructor(
    "0014",
    "stroller francis",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="images/stroller-francis.png" alt=" Sport number two" />'
  );

  let stroller_essential = new item_constructor(
    "0015",
    "stroller essential",
    `${moneySign}`,
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="images/stroller-essential.png" alt=" Sport number two" />'
  );

  array_of_store_items.push(
    car_seat_advocate,
    car_seat_grow_and_go,
    criba_luna,
    stroller_forest,
    crib_essential,
    car_seat_beryl,
    car_seat_giro,
    car_seat_one_4life,
    crib_alessia,
    crib_beyond,
    crib_dream,
    stroller_epic,
    stroller_spark,
    stroller_francis,
    stroller_essential
  );

  function_display_items(array_of_store_items);
};

document.addEventListener("DOMContentLoaded", loadPage);
