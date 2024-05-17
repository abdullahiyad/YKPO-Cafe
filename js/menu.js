let cartIcon = document.querySelector(".cart-icon");
let cartCloseBtn = document.querySelector(".cart-tap .close");
let body = document.querySelector("body");
const elem = document.querySelector("product-img123");
cartIcon.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
cartCloseBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

//function to add product to cart when click addtocart
let cartList = document.querySelector(".list-cart");
function addToCart(event) {
  const clickedElement = event.target;
  const productContainter = clickedElement.parentElement.parentElement;
  const productId = productContainter.querySelector(".product-id").textContent;
  const productName =
    productContainter.querySelector(".product-title").textContent;
  const productPrice = productContainter.querySelector(".price-x").textContent;
  const newProduct = document.createElement("div");
  newProduct.innerHTML = `
  <div class="product">
    <div class="product-id">${productId}</div>
    <h4>${productName}</h4>
    <div class="quantity">
      <i class="fa-solid fa-circle-minus" onclick="decreaseQuantity(event)"></i>
      <span class="quan">${1}</span>
      <i class="fa-solid fa-circle-plus" onclick="increaseQuantity(event)"></i>
    </div>
      <p><span>${productPrice}</span>$</p>
      <i class="fa-solid fa-trash-can remove" onclick="deleteProduct(event)"></i>
  </div>
`;
  addObject(productId, productName, productPrice, 1);
  cartList.appendChild(newProduct.firstElementChild);
}

//function to add proudct from database to menu page
let hotDrinksContainer = document.querySelector(".hot-drinks .products");
let coldDrinksContainer = document.querySelector(".cold-drinks .products");
let foodContainer = document.querySelector(".food .products");
let dessertContainer = document.querySelector(".dessert .products");
function addProduct(
  productId,
  productImg,
  productName,
  productPrice,
  productDescription,
  productType
) {
  const newProduct = document.createElement("div");
  newProduct.innerHTML = `
  <div class="product">
       <div class="product-id">${productId}</div>
       <div class="product-img"><img src="${productImg}" alt="">
       </div>
       <div class="product-info">
           <p class="product-title">${productName}</p>
           <p class="product-description">${productDescription}.</p>
       </div>
       <div class="price">
           <p><span class="price-x">${productPrice}</span> $</p>
           <button class="atc" onclick="addToCart(event)">Add To Cart</button>
       </div>
   </div>
  `;
  if (productType == "hot-drinks") {
    hotDrinksContainer.appendChild(newProduct.firstElementChild);
  } else if (productType == "cold-drinks") {
    coldDrinksContainer.appendChild(newProduct.firstElementChild);
  } else if (productType == "food") {
    foodContainer.appendChild(newProduct.firstElementChild);
  } else {
    dessertContainer.appendChild(newProduct.firstElementChild);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeProducts();
  // Fetch product data from the backend and populate the table
  fetch("/admin/products/api")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    })
    .then((data) => {
      data.products.forEach((product) => {
        let base64Image = arrayBufferToBase64(product.image.data.data);
        let imgSrc = base64Image;
        // Assuming product.image contains ArrayBuffer image data
        addProduct(
          product._id,
          imgSrc,
          product.name,
          product.price,
          product.description,
          product.type
        );
      });
    })
    .catch((error) => console.error("Error fetching product data:", error));

  // Function to convert ArrayBuffer to Base64-encoded string
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/jpeg;base64," + window.btoa(binary);
  }
});

//burger icon
let linkIcon = document.querySelector(".burger-icon");
let linkList = document.querySelector("ul");
linkIcon.addEventListener("click", function () {
  if (linkIcon.classList.contains("clicked")) {
    linkList.style.display = "none";
    linkIcon.classList.remove("clicked");
  } else {
    linkList.style.display = "block";
    linkIcon.classList.add("clicked");
  }
});

/* loading */
let loading = document.querySelector(".loader");
window.addEventListener("load", function () {
  loading.style.display = "none";
});
/* loading end */

/* home links list */
let link = document.querySelectorAll(".links li");
link.forEach((element) => {
  if (window.innerWidth <= 800) {
    element.addEventListener("click", function () {
      if (linkIcon.classList.contains("clicked")) {
        linkList.style.display = "none";
        linkIcon.classList.remove("clicked");
      } else {
        linkList.style.display = "block";
        linkIcon.classList.add("clicked");
      }
    });
  }
});

// Function to run on page load to initialize products
function initializeProducts(
  productId,
  productName,
  productQuantity,
  productPrice
) {
  const array = JSON.parse(sessionStorage.getItem("productsArray"));
  if (array) {
    array.forEach((product) => {
      const newProduct = document.createElement("div");
      newProduct.innerHTML = `
  <div class="product">
    <div class="product-id">${product.Id}</div>
    <h4>${product.name}</h4>
    <div class="quantity">
      <i class="fa-solid fa-circle-minus" onclick="decreaseQuantity(event)"></i>
      <span class="quan">${product.quan}</span>
      <i class="fa-solid fa-circle-plus" onclick="increaseQuantity(event)"></i>
    </div>
      <p><span>${product.price}</span>$</p>
      <i class="fa-solid fa-trash-can remove" onclick="deleteProduct(event)"></i>
  </div>
`;

      cartList.appendChild(newProduct.firstElementChild);
    });
  }
}

//function to increase quantity
function increaseQuantity(event) {
  const clickedElement = event.target;
  const product = clickedElement.parentElement;
  const quantity = product.querySelector(".quan");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
  const productId =
    clickedElement.parentElement.parentElement.querySelector(
      ".product-id"
    ).innerHTML;
  increaseQuantityArr(productId);
}

//function to decrease quantity
function decreaseQuantity(event) {
  const clickedElement = event.target;
  const product = clickedElement.parentElement;
  const quantity = product.querySelector(".quan");
  const productId =
    clickedElement.parentElement.parentElement.querySelector(
      ".product-id"
    ).innerHTML;
  if (Number(quantity.innerHTML) > 1) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    decreaseQuantityArr(productId);
  } else {
    clickedElement.parentElement.parentElement.remove();
    //function to remove element from product array
    removeObject(productId);
  }
}

//function to remove product from cart list
function deleteProduct(event) {
  const clickedElement = event.target;
  const productId =
    clickedElement.parentElement.querySelector(".product-id").innerHTML;
  clickedElement.parentElement.remove();
  //function to remove it from  product array
  removeObject(productId);
}
//function to create array Products
function createArray() {
  if (!sessionStorage.getItem("productsArray")) {
    const array = [];
    sessionStorage.setItem("productsArray", JSON.stringify(array));
  }
}

// Call this function to initialize the array in local storage only if it doesn't already exist
createArray();

//function add object to array in session storage

// Function to add an object to the array or increase the quantity if it already exists
function addObject(productId, productName, productPrice, productQuantity = 1) {
  let array = JSON.parse(sessionStorage.getItem("productsArray"));
  let productExists = false;

  array = array.map((item) => {
    if (item.id === productId) {
      item.quan += productQuantity;
      productExists = true;
    }
    return item;
  });

  if (!productExists) {
    const newProduct = {
      id: productId,
      name: productName,
      price: productPrice,
      quan: productQuantity,
    };
    array.push(newProduct);
  }

  sessionStorage.setItem("productsArray", JSON.stringify(array));
}

//function to remove object from array in session storage
function removeObject(productId) {
  let array = JSON.parse(sessionStorage.getItem("productsArray"));
  array = array.filter((item) => item.id !== productId);
  sessionStorage.setItem("productsArray", JSON.stringify(array));
}

//function to increase quantity on object in  array
function increaseQuantityArr(productId) {
  let array = JSON.parse(sessionStorage.getItem("productsArray"));
  array = array.map((item) => {
    if (item.id === productId) {
      item.quan += 1;
    }
    return item;
  });
  sessionStorage.setItem("productsArray", JSON.stringify(array));
}

//function to decrease quantity on object in array
function decreaseQuantityArr(productId) {
  let array = JSON.parse(sessionStorage.getItem("productsArray"));
  array = array.map((item) => {
    if (item.id === productId) {
      item.quan -= 1; // Ensure quantity doesn't go below 0
    }
    return item;
  });
  sessionStorage.setItem("productsArray", JSON.stringify(array));
}
