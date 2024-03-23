"use strict";

function Store_item(
  id_store_item,
  name_store_item,
  price_store_item,
  description_store_item,
  qty_available,
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

// Inicialización de arrays
let store_item_array = [];
let cart_item_array = [];

let currencyOptions = document.querySelector(".currencySelector");
let time_container = document.querySelector(".wrapp-intro-time");
let currencyFactor = 1;
// Just to display CAD or CLP
let moneySign = "";
let currentFlag = document.querySelector(".current-flag");
let filterCategory = document.querySelector(".displayFilter");

// Función para mostrar los elementos del carrito
const displayCartItems = function (cartItems) {
  const cartContainer = document.querySelector(".cartContainer");
  cartContainer.innerHTML = ""; // Limpiar el contenedor del carrito

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>No items in cart</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector("tbody");

  cartItems.forEach((item) => {
    const subtotal = item.price_cart_item * item.qty_cart_item;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id_cart_item}</td>
      <td>${item.name_cart_item}</td>
      <td>$${item.price_cart_item}</td>
      <td>${item.qty_cart_item}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  cartContainer.appendChild(table);
};

// Función para agregar un producto al carrito
function addToCart() {
  const productId = document.getElementById("addItemId").value;
  const quantity = parseInt(document.getElementById("addItemQty").value);

  const product = store_item_array.find(
    (item) => item.id_store_item === productId
  );

  if (product && quantity > 0) {
    const cartItem = new Cart_item(
      product.id_store_item,
      product.price_store_item,
      quantity,
      product.shipping_cost
    );
    cart_item_array.push(cartItem);

    displayCartItems(cart_item_array); // Actualizar visualización del carrito
  } else {
  }
}

// Función para mostrar los productos de la tienda en la tabla
const displayStoreItems = function (store_item_array) {
  const productsGrid = document.querySelector(".productsWrapper");
  productsGrid.innerHTML = "";

  store_item_array.forEach((item) => {
    const itemHTML = `
      <tr>
        <td class="product-id">${item.id_store_item}</td>
        <td class="product-name">${item.name_store_item}</td>
        <td class="product-price">${item.price_store_item}</td>
        <td class="product-descr">${item.description_store_item}</td>
        <td class="product-qty">${item.qty_available}</td>
        <td class="product-max">${item.max_qty_allowed}</td>
        <td class="product-cat">${item.category_store_item}</td>
        <td class="product-photo">${item.image_store_item}</td>
      </tr>
    `;
    productsGrid.innerHTML += itemHTML;
  });
};

// Function to update the currency
const updateCurrency = function () {
  if (currencyOptions.value == "CAD") {
    currencyFactor = 1;
    moneySign = "CAD";
    currentFlag.src = "/assets/images/canada.png";
  } else if (currencyOptions.value == "CLP") {
    currencyFactor = 711.8;
    moneySign = "CLP";
    currentFlag.src = "/assets/images/chile.png";
  }
};

// main function
const initial_function = function () {
  time_container.innerHTML = new Date();
  // Inicialización de productos de la tienda

  const product1 = new Store_item(
    "001",
    "Car Seat Advocate",
    345,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    115,
    3,
    "Car Seat",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
  );

  const product2 = new Store_item(
    "002",
    "Stroller Grow and Go",
    231.34,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    472,
    10,
    "Stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
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
    397.5,
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
    497.5,
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
    197.5,
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
    797.5,
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
    397.5,
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
    1197.5,
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi in voluptatibus, qui optio maxime ea dolorum mollitia quisquam voluptas culpa ducimus ratione eligendi?",
    112,
    10,
    "stroller",
    null,
    null,
    '<img class="product-image" src="/assets/images/stroller-essential.png" alt=" Sport number two" />'
  );

  // Agregar productos a la tienda
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

  // Mostrar los productos de la tienda
  displayStoreItems(store_item_array);

  // Mostrar los elementos del carrito (inicialmente vacío)
  displayCartItems(cart_item_array);

  updateCurrency();
};

// Event listener para el botón "Add Item"
document.querySelector(".btnAddItem").addEventListener("click", addToCart);
// Defining the currency type
currencyOptions.addEventListener("change", updateCurrency);

// // Filtering products
// filterCategory.addEventListener("change", function () {
//   const selectedCategory = filterCategory.value.toLowerCase().trim();

//   // Filtra los productos basados en la categoría seleccionada
//   const filteredProducts = store_item_array.filter(function (product) {
//     const productCategory = product.category_store_item.toLowerCase().trim();
//     return selectedCategory === "all" || productCategory === selectedCategory;
//   });

//   // Muestra los productos filtrados en la página
//   displayStoreItems(filteredProducts);
// });

// initial function
document.addEventListener("DOMContentLoaded", initial_function);
