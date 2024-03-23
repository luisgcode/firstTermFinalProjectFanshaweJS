"use strict";

function Store_item(
  id_store_item,
  name_store_item,
  price_store_item,
  qty_available,
  description_store_item,
  max_qty_allowed,
  category_store_item,
  shipping_cost,
  reviews_store_item,

  image_store_item
) {
  this.id_store_item = id_store_item;
  this.name_store_item = name_store_item;
  this.price_store_item = price_store_item;
  this.description_store_item = description_store_item;
  this.qty_available = qty_available;
  this.max_qty_allowed = max_qty_allowed;
  this.category_store_item = category_store_item;
  this.shipping_cost = shipping_cost;
  this.reviews_store_item = reviews_store_item;

  this.image_store_item = image_store_item;
}

function Cart_item(
  id_cart_item,
  price_cart_item,
  qty_cart_item,
  shipping_cart_item
) {
  this.id_cart_item = id_cart_item;
  this.price_cart_item = price_cart_item;
  this.qty_cart_item = qty_cart_item;
  this.shipping_cart_item = shipping_cart_item;
}

function Review_item(review_item, rating_item) {
  this.review_item = review_item;
  this.rating_item = rating_item;
}

// Global variables:
let store_item_array = [];
let cart_item_array = [];
const time_container = document.querySelector(".wrapp-intro-time");

const initial_function = function () {
  // DISPLAYING THE TIME
  time_container.innerHTML = new Date();

  // POPULATING 15 ITEM OBJECTS

  let product1 = new Store_item(
    "001",
    "car seat advocate",
    345,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    115,
    3,
    "car seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
  );

  let product2 = new Store_item(
    "002",
    "car seat Grow and Go",
    231.34,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    472,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-grow-and-go.png" alt=" Sport number two" />'
  );
  let product3 = new Store_item(
    "003",
    "crib luna",
    987.13,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    1115,
    3,
    "crib",
    null,
    null,
    '<img class="product-image" src="/assets/images/crib-luna.png" alt=" Sport number two" />'
  );

  let product4 = new Store_item(
    "004",
    "stroller forest",
    222.99,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    472,
    10,
    "Stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-forest.png" alt=" Sport number two" />'
  );

  let product5 = new Store_item(
    "005",
    "crib essential",
    342,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    79,
    5,
    "crib",
    null,
    null,
    '<img class="product-image" src="/assets/images/crib-essential.png" alt=" Sport number two" />'
  );

  let product6 = new Store_item(
    "006",
    "car seat beryl",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-beryl.png" alt=" Sport number two" />'
  );

  let product7 = new Store_item(
    "007",
    "car seat i-giro",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-i-giro.png" alt=" Sport number two" />'
  );

  let product8 = new Store_item(
    "008",
    "car seat one4life",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "car seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-one4life.png" alt=" Sport number two" />'
  );

  let product9 = new Store_item(
    "009",
    "crib alessia",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="/assets/images/crib-alessia.png" alt=" Sport number two" />'
  );

  let product10 = new Store_item(
    "0010",
    "crib beyond",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="/assets/images/crib-beyond.png" alt=" Sport number two" />'
  );

  let product11 = new Store_item(
    "0011",
    "crib dream",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "crib",
    null,
    null,
    '<img class="product-image" src="/assets/images/crib-dream.png" alt=" Sport number two" />'
  );

  let product12 = new Store_item(
    "0012",
    "stroller epic",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-epic.png" alt=" Sport number two" />'
  );

  let product13 = new Store_item(
    "0013",
    "stroller spark",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-spark.png" alt=" Sport number two" />'
  );

  let product14 = new Store_item(
    "0014",
    "stroller francis",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-francis.png" alt=" Sport number two" />'
  );

  let product15 = new Store_item(
    "0015",
    "stroller essential",
    897.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-essential.png" alt=" Sport number two" />'
  );

  store_item_array.push(
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15
  );

  // Call your function that will display the store items array
  displayStoreItems();
  // Call your function that will display the cart items array
  displayCartItems();
};

addEventListener("DOMContentLoaded", initial_function);
