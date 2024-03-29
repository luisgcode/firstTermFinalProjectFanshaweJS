"use strict";
// Const variables
const cart_output = document.querySelector("#cartOutput");
const cart_checkout = document.querySelector("#cartCheckout");
const add_to_cart_btn = document.querySelector(".btnAddItem");
const remove_from_cart_btn = document.querySelector(".btnremoveItem");
const screenDate = document.querySelector(".wrapp-intro-time");
// Let variables
let currentFlag = document.querySelector(".current-flag");
let moneySign = "CAD";
let currencyFactor = 1;
let productsWrapper = document.querySelector(".productsWrapper");
let filterCategory = document.querySelector(".displayFilter");
let currencyOptions = document.querySelector(".currencySelector");

// Empty arrays to insert the products later
let store_item_array = [];
let cart_item_array = [];

// Main constructors
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
  name_cart_item,
  price_cart_item,
  qty_cart_item,
  shipping_cart_item
) {
  this.id_cart_item = id_cart_item;
  this.name_cart_item = name_cart_item;
  this.price_cart_item = price_cart_item;
  this.qty_cart_item = qty_cart_item;
  this.shipping_cart_item = shipping_cart_item;
}
function Review_item(review_item, rating_item) {
  this.review_item = review_item;
  this.rating_item = rating_item;
}

const validateItemId = (productId) => {
  return store_item_array.some((item) => item.id_store_item === productId);
};

// Only for setting the currency factor and the image flag
const updateCurrency = function () {
  if (currencyOptions.value === "CAD") {
    currencyFactor = 1;
    moneySign = "CAD";
    currentFlag.src = "assets/images/canada.png";
  } else if (currencyOptions.value === "CLP") {
    currencyFactor = 711.8;
    moneySign = "CLP";
    currentFlag.src = "assets/images/chile.png";
  }

  displayStoreItems(store_item_array);
};

// displaying products
const displayStoreItems = function (products) {
  let productsGrid = document.querySelector(".productsWrapper");
  productsGrid.innerHTML = "";

  products.forEach((item) => {
    let formattedPrice = (
      item.price_store_item * currencyFactor
    ).toLocaleString(undefined, {
      style: "currency",
      currency: moneySign,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const itemHTML = `
      <tr>
        <td class="product-id">${item.id_store_item}</td>
        <td class="product-name">${item.name_store_item}</td>
        <td class="product-price">${formattedPrice}</td>
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

// displaying car items
const displayCartItems = function (cartItems) {
  const cartContainer = document.querySelector(".cartContainer");
  cartContainer.innerHTML = "";

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
      <td>$${item.price_cart_item.toFixed(2)}</td>
      <td>${item.qty_cart_item}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  cartContainer.appendChild(table);
};

// Filtering products
filterCategory.addEventListener("change", function () {
  const selectedCategory = filterCategory.value.toLowerCase().trim();

  const filteredProducts = store_item_array.filter(function (product) {
    const productCategory = product.category_store_item.toLowerCase().trim();
    return selectedCategory === "all" || productCategory === selectedCategory;
  });

  displayStoreItems(filteredProducts);
});

// Función para agregar un elemento al carrito
const addToCart = function () {
  const productIdInput = document.getElementById("addItemId");
  const quantityInput = document.getElementById("addItemQty");

  const productId = productIdInput.value.trim();
  const quantityToAdd = parseInt(quantityInput.value);

  // Validate Item ID
  if (!productId) {
    alert("Please enter an Item ID.");
    return;
  }

  if (!validateItemId(productId)) {
    alert("Item ID does not exist in the inventory.");
    return;
  }

  // Validate Item Quantity
  if (quantityToAdd < 1) {
    alert("Quantity must be at least 1.");
    return;
  }

  if (!validateItemQuantity(productId, quantityToAdd)) {
    alert("Invalid quantity or exceeding the maximum allowed quantity.");
    return;
  }

  const product = store_item_array.find(
    (item) => item.id_store_item === productId
  );

  if (product && quantityToAdd > 0) {
    const quantityToAddLimited = Math.min(
      quantityToAdd,
      product.max_qty_allowed
    );

    const existingCartItem = cart_item_array.find(
      (item) => item.id_cart_item === productId
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.qty_cart_item + quantityToAddLimited;
      const maxQtyAllowed = product.max_qty_allowed;

      if (newQuantity <= maxQtyAllowed) {
        existingCartItem.qty_cart_item = newQuantity;
      } else {
        // Adjust quantity to the maximum allowed
        existingCartItem.qty_cart_item = maxQtyAllowed;

        // Update quantity available in inventory
        product.qty_available += quantityToAddLimited - maxQtyAllowed;

        // Show alert indicating maximum allowed quantity reached
        alert(
          "You have reached the maximum quantity allowed for this product."
        );
      }
    } else {
      const cartItem = new Cart_item(
        product.id_store_item,
        product.name_store_item,
        product.price_store_item,
        quantityToAddLimited,
        product.shipping_cost
      );

      cart_item_array.push(cartItem);
    }

    // Update quantity available in inventory
    product.qty_available -= quantityToAddLimited;

    displayCartItems(cart_item_array);
    calculateCartPricing();
    displayStoreItems(store_item_array);
    calculateCartTotals();
  } else {
    console.log("Invalid product ID or quantity.");
  }
};

// Remove from cart
const removeFromCart = function (productId, quantityToRemove) {
  const index = cart_item_array.findIndex(
    (item) => item.id_cart_item === productId
  );

  if (index !== -1) {
    const currentQuantity = cart_item_array[index].qty_cart_item;

    // Validate if the current quantity is greater than the quantity to remove
    if (currentQuantity >= quantityToRemove) {
      cart_item_array[index].qty_cart_item -= quantityToRemove;

      // Restore the available quantity in the inventory
      const product = store_item_array.find(
        (item) => item.id_store_item === productId
      );
      if (product) {
        product.qty_available += quantityToRemove;
      }

      // If the quantity in the cart reaches 0, remove the item from the cart
      if (cart_item_array[index].qty_cart_item === 0) {
        cart_item_array.splice(index, 1);
      }

      displayCartItems(cart_item_array);
      calculateCartPricing();
      calculateCartTotals();
    } else {
      alert("Quantity to remove exceeds the current quantity in the cart.");
    }
  } else {
    alert("Product not found in cart.");
  }
};

// Event handler
remove_from_cart_btn.addEventListener("click", function () {
  const productIdInput = document.getElementById("addItemId");
  const productId = productIdInput.value.trim();

  // Validate if quantity to remove is greater than 0
  const quantityInput = document.getElementById("addItemQty");
  const quantityToRemove = parseInt(quantityInput.value);

  if (quantityToRemove <= 0) {
    alert("Quantity to remove must be greater than 0.");
    return;
  }

  removeFromCart(productId, quantityToRemove);
});

// Calculate total value
const calculateCartPricing = function () {
  const total = cart_item_array.reduce(
    (accumulator, item) =>
      accumulator + item.price_cart_item * item.qty_cart_item,
    0
  );

  cart_output.textContent = total.toFixed(2);
};

// Details of articles
const displayItemDetails = function (productId) {
  const product = store_item_array.find(
    (item) => item.id_store_item === productId
  );

  if (product) {
    const {
      id_store_item,
      name_store_item,
      price_store_item,
      description_store_item,
      qty_available,
      max_qty_allowed,
      category_store_item,
      shipping_cost,
      reviews_store_item,
    } = product;

    let averageRating = 0;
    if (reviews_store_item && reviews_store_item.length > 0) {
      const totalRating = reviews_store_item.reduce(
        (accumulator, review) => accumulator + review.rating_item,
        0
      );
      averageRating = totalRating / reviews_store_item.length;
    }

    let alertMessage = `
      Product ID: ${id_store_item}
      Name: ${name_store_item}
      Price: $${price_store_item.toFixed(2)}
      Description: ${description_store_item}
      Quantity Available: ${qty_available}
      Max Quantity Allowed: ${max_qty_allowed}
      Category: ${category_store_item}
    `;

    if (shipping_cost !== null && shipping_cost !== undefined) {
      alertMessage += `
        Shipping Cost: $${shipping_cost.toFixed(2)}
      `;
    } else {
      alertMessage += `
        Shipping Cost: Not specified
      `;
    }

    if (reviews_store_item && reviews_store_item.length > 0) {
      alertMessage += `
        \nReviews:
      `;
      reviews_store_item.forEach((review) => {
        alertMessage += `
          - ${review.review_item}
        `;
      });
      alertMessage += `
        Average Rating: ${averageRating.toFixed(2)}/5
      `;
    } else {
      alertMessage += `
        \nNo reviews available yet.
      `;
    }

    alert(alertMessage);
  } else {
    alert("Product not found. Please enter a valid product ID.");
  }
};

// Total of cart
const calculateCartTotals = function () {
  // Calcula el subtotal de los items en el carrito
  const subtotalItems = cart_item_array.reduce(
    (acc, item) => acc + item.price_cart_item * item.qty_cart_item,
    0
  );

  // Calcula el costo total de envío sumando el envío de cada item en el carrito
  const shippingCost = cart_item_array.reduce(
    (acc, item) => acc + item.shipping_cart_item * item.qty_cart_item,
    0
  );

  // Calcula el subtotal total (subtotal de los items + costo total de envío)
  const totalSubtotal = subtotalItems + shippingCost;

  // Calcula el impuesto aplicando un 13% al subtotal total
  const tax = totalSubtotal * 0.13;

  // Calcula el gran total (subtotal total + impuesto)
  const total = totalSubtotal + tax;

  // Muestra los resultados en los elementos HTML correspondientes
  cart_output.innerHTML = `
    Items Subtotal: ${formatCurrency(subtotalItems)} <br />
    Estimated Shipping: ${formatCurrency(shippingCost)}
  `;

  cart_checkout.innerHTML = `
    Subtotal: ${formatCurrency(totalSubtotal)} <br />
    Estimated Tax: ${formatCurrency(tax)} <br />
    Order Total: ${formatCurrency(total)}
  `;
};

// Helper to format the prices
const formatCurrency = function (amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyOptions.value,
  }).format(amount);
};

calculateCartTotals();

// Event listener article details btn
const btnDetails = document.querySelector(".btnDetails");

btnDetails.addEventListener("click", function () {
  const productIdInput = document.getElementById("addItemId");
  const productId = productIdInput.value.trim();

  // Mostrar los detalles del artículo
  displayItemDetails(productId);
});

// Adding a review
const submitReview = function () {
  const productIdInput = document.getElementById("reviewId");
  const reviewInput = document.getElementById("reviewDesc");
  const ratingInput = document.getElementById("reviewNum");

  // Verificar que los elementos del formulario existan y no sean nulos
  if (productIdInput && reviewInput && ratingInput) {
    const productId = productIdInput.value.trim();
    const review = reviewInput.value.trim();
    const rating = parseInt(ratingInput.value);

    if (productId && review && !isNaN(rating) && rating >= 1 && rating <= 5) {
      const product = store_item_array.find(
        (item) => item.id_store_item === productId
      );

      if (product) {
        const newReview = new Review_item(review, rating);
        if (!product.reviews_store_item) {
          product.reviews_store_item = []; // Inicializar el array si es null
        }
        product.reviews_store_item.push(newReview);

        // Limpiar los campos del formulario después de agregar la reseña
        productIdInput.value = "";
        reviewInput.value = "";
        ratingInput.value = "";

        displayItemDetails(productId);
      } else {
        alert("Product not found. Please enter a valid product ID.");
      }
    } else {
      alert("Please enter valid values for all fields.");
    }
  } else {
    console.error("One or more form elements are missing.");
  }
};

// Function to validate Item Quantity
const validateItemQuantity = (productId, quantity) => {
  const product = store_item_array.find(
    (item) => item.id_store_item === productId
  );
  if (
    product &&
    quantity >= 1 &&
    quantity <= product.qty_available &&
    quantity <= product.max_qty_allowed
  ) {
    return true;
  } else {
    return false;
  }
};

// Original function
const loadPage = function () {
  screenDate.innerHTML = new Date();
  // Default value for money
  moneySign = "CAD";
  // Defining the currency type
  currencyOptions.addEventListener("change", updateCurrency);

  const product1 = new Store_item(
    "001",
    "Car Seat Advocate",
    345,
    "The Car Seat Advocate offers top-tier comfort and safety features, ensuring a secure ride for your little one",
    115,
    25,
    "Car Seat",
    1,
    null,
    '<img class="product-image" src="assets/images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
  );

  const product2 = new Store_item(
    "002",
    "Stroller Grow and Go",
    231.34,
    "The Stroller Grow and Go is a versatile companion, adapting effortlessly to your child's growth and various travel needs",
    472,
    100,
    "Stroller",
    4,
    null,
    '<img class="product-image" src="assets/images/car-seat-convertible-advocate.png" alt=" Sport number two" />'
  );

  let product3 = new Store_item(
    "003",
    "crib luna",
    987.13,
    "The Crib Luna combines style and durability, providing a cozy and secure environment for your baby's sleep",
    1115,
    45,
    "crib",
    3,
    null,
    '<img class="product-image" src="assets/images/crib-luna.png" alt=" Sport number two" />'
  );

  let product4 = new Store_item(
    "004",
    "stroller forest",
    222.99,
    "The Stroller Forest is a rugged yet lightweight choice, perfect for outdoor excursions and urban adventures alike",
    472,
    70,
    "Stroller",
    2,
    null,
    '<img class="product-image" src="assets/images/stroller-forest.png" alt=" Sport number two" />'
  );

  let product5 = new Store_item(
    "005",
    "crib essential",
    342,
    "The Crib Essential is a simple yet elegant crib, designed with your baby's comfort and safety in mind",
    79,
    38,
    "crib",
    1,
    null,
    '<img class="product-image" src="assets/images/crib-essential.png" alt=" Sport number two" />'
  );

  let product6 = new Store_item(
    "006",
    "car seat beryl",
    897.5,
    "The Car Seat Beryl is a modern marvel, boasting advanced features and adjustable options for a customized fit.",
    112,
    30,
    "car seat",
    4,
    null,
    '<img class="product-image" src="assets/images/car-seat-convertible-beryl.png" alt=" Sport number two" />'
  );

  let product7 = new Store_item(
    "007",
    "car seat i-giro",
    897.5,
    "The Car Seat I-Giro revolutionizes convenience with its 360-degree rotation, offering effortless access and safety",
    112,
    20,
    "car seat",
    32,
    null,
    '<img class="product-image" src="assets/images/car-seat-convertible-i-giro.png" alt=" Sport number two" />'
  );

  let product8 = new Store_item(
    "008",
    "car seat one4life",
    897.5,
    "The Car Seat One4Life grows with your child, providing long-lasting comfort and security throughout their development",
    112,
    40,
    "car seat",
    5,
    null,
    '<img class="product-image" src="assets/images/car-seat-convertible-one4life.png" alt=" Sport number two" />'
  );

  let product9 = new Store_item(
    "009",
    "crib alessia",
    897.5,
    "The Crib Alessia is a classic choice, combining timeless design with practicality for a cozy nursery setting",
    112,
    40,
    "crib",
    14,
    null,
    '<img class="product-image" src="assets/images/crib-alessia.png" alt=" Sport number two" />'
  );

  let product10 = new Store_item(
    "0010",
    "crib beyond",
    397.5,
    "The Crib Beyond offers versatility and storage solutions, ensuring functionality and convenience for busy parents.",
    112,
    40,
    "crib",
    45,
    null,
    '<img class="product-image" src="assets/images/crib-beyond.png" alt=" Sport number two" />'
  );

  let product11 = new Store_item(
    "0011",
    "crib dream",
    497.5,
    "The Crib Dream is a dreamy sanctuary, providing a peaceful sleep environment with its comfortable and secure design",
    112,
    60,
    "crib",
    7,
    null,
    '<img class="product-image" src="assets/images/crib-dream.png" alt=" Sport number two" />'
  );

  let product12 = new Store_item(
    "0012",
    "stroller epic",
    197.5,
    "The Stroller Epic blends style and functionality, making it the ideal choice for navigating city streets with ease.",
    112,
    30,
    "stroller",
    2,
    null,
    '<img class="product-image" src="assets/images/stroller-epic.png" alt=" Sport number two" />'
  );

  let product13 = new Store_item(
    "0013",
    "stroller spark",
    797.5,
    "The Stroller Spark is a lightweight and compact companion, perfect for on-the-go families and travel enthusiasts",
    112,
    20,
    "stroller",
    10,
    null,
    '<img class="product-image" src="assets/images/stroller-spark.png" alt=" Sport number two" />'
  );

  let product14 = new Store_item(
    "0014",
    "stroller francis",
    397.5,
    "The Stroller Francis combines sleek design with maneuverability, offering a smooth and comfortable ride for your child.",
    112,
    20,
    "stroller",
    11,
    null,
    '<img class="product-image" src="assets/images/stroller-francis.png" alt=" Sport number two" />'
  );

  let product15 = new Store_item(
    "0015",
    "stroller essential",
    1197.5,
    "The Stroller Essential is a must-have for busy parents, featuring comfort and convenience for everyday outings.",
    112,
    30,
    "stroller",
    21,
    null,
    '<img class="product-image" src="assets/images/stroller-essential.png" alt=" Sport number two" />'
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

  displayStoreItems(store_item_array);

  displayCartItems(cart_item_array);

  updateCurrency();

  add_to_cart_btn.addEventListener("click", addToCart);

  const submitReviewBtn = document.querySelector(".reviewSection .btn");
  submitReviewBtn.addEventListener("click", submitReview);
};

document.addEventListener("DOMContentLoaded", loadPage);

document.addEventListener("DOMContentLoaded", calculateCartTotals);

document.addEventListener("DOMContentLoaded", loadPage);
