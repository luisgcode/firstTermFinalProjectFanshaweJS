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
    currentFlag.src = "/assets/images/canada.png";
  } else if (currencyOptions.value == "CLP") {
    currencyFactor = 711.8;
    moneySign = "CLP";
    currentFlag.src = "/assets/images/chile.png";
  }

  function_display_items();
};

// Original function load
const loadPage = function () {
  // Default values for the first time it loads
  moneySign = "CAD";

  // Defining the currency type
  currencyOptions.addEventListener("change", updateCurrency);

  function_display_items(array_of_store_items);
};

document.addEventListener("DOMContentLoaded", loadPage);
