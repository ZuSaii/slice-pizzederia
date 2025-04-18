//HTML ELEMENTS
const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
const $basketProducts = document.querySelector(".basket-products");
const $basketTotalQuantity = document.querySelector("h2");

//HTML BUTTONS/SELECT/INPUT/ANCRE

//PARAMETRES
let quantityProductBasket = 1;
let resultsApi;
let pizzaItem;
let currentBasketPanier;
let currentProduct;
let basketProductItem;
let currentBasket = [];

async function getProducts() {
  const res = await fetch("http://10.59.122.27:3000/products");
  const data = await res.json();

  return data;
}

function createPizzaCart(product) {
  const $pizzaItem = document.createElement("div");
  $pizzaItem.classList.add("pizza-item");
  $pizzaItem.setAttribute("data-id", product.id);
  $pizzaItem.setAttribute("title", product.description);

  const $pizzaPicture = document.createElement("img");
  $pizzaPicture.classList.add("pizza-picture");
  $pizzaPicture.src = `${product.image}`;

  const $addToCartBtn = document.createElement("span");
  $addToCartBtn.classList.add("add-to-cart-btn");

  const $quantityToCartBtn = document.createElement("span");
  $quantityToCartBtn.classList.add("quantity-to-cart-btn");
  $quantityToCartBtn.classList.add("hidden");

  const $quantityToCartBtnImgPlus = document.createElement("img");
  $quantityToCartBtnImgPlus.src = `/images/Add to Cart - Add Icon.svg`;
  const $quantityToCartBtnImgMoins = document.createElement("img");
  $quantityToCartBtnImgMoins.src = `/images/moins.svg`;

  const $addToCartBtnImg = document.createElement("img");
  $addToCartBtnImg.src = `/images/carbon_shopping-cart-plus.svg`;
  $addToCartBtn.textContent = "Ajouter au panier";

  const $pizzaInfos = document.createElement("ul");
  $pizzaInfos.classList.add("pizza-infos");

  const $pizzaName = document.createElement("li");
  $pizzaName.classList.add("pizza-name");
  $pizzaName.textContent = `${product.name}`;

  const $pizzaPrice = document.createElement("li");
  $pizzaPrice.classList.add("pizza-price");
  $pizzaPrice.textContent = `$${product.price}`;

  $pizzaItem.appendChild($pizzaPicture);
  $pizzaItem.appendChild($addToCartBtn);
  $pizzaItem.appendChild($quantityToCartBtn);
  $addToCartBtn.appendChild($addToCartBtnImg);
  $quantityToCartBtn.textContent = "1";
  $quantityToCartBtn.appendChild($quantityToCartBtnImgMoins);
  $quantityToCartBtn.appendChild($quantityToCartBtnImgPlus);
  $pizzaItem.appendChild($pizzaInfos);
  $pizzaInfos.appendChild($pizzaName);
  $pizzaInfos.appendChild($pizzaPrice);

  return [$pizzaItem, $quantityToCartBtnImgMoins, $quantityToCartBtnImgPlus]
}

async function main() {
  const pizzaData = await getProducts();

  pizzaData.forEach((pizza) => {
    const [$pizzaItem, $quantityToCartBtnImgMoins, $quantityToCartBtnImgPlus] = createPizzaCart(pizza);

    $pizzaWrapper.appendChild($pizzaItem);

    $pizzaItem.querySelector(".add-to-cart-btn").addEventListener("click", function (e) {
        document.querySelector(".empty-basket").classList.add("hidden");addToOrder($pizzaItem.getAttribute("data-id"),pizza,$pizzaItem.querySelector(".add-to-cart-btn"),$pizzaItem.querySelector(".quantity-to-cart-btn"));
    });
  });
}

main();

// fetch("http://10.59.122.27:3000/products")
//   .then((res) => res.json())
//   .then((data) => {
//     resultsApi = data;
//     console.log(resultsApi);
//     createProductsItems();
//   })
//   .catch((err) => console.log("Une erreur est survenue", err));

// function createProductsItems() {
//   resultsApi.forEach((product) => {
//     console.log(product);
//     currentProduct = product;
//     const $pizzaItem = document.createElement("div");
//     $pizzaItem.classList.add("pizza-item");
//     $pizzaItem.setAttribute("data-id", product.id);
//     $pizzaItem.setAttribute("title", product.description);

//     const $pizzaPicture = document.createElement("img");
//     $pizzaPicture.classList.add("pizza-picture");
//     $pizzaPicture.src = `${product.image}`;

//     const $addToCartBtn = document.createElement("span");
//     $addToCartBtn.classList.add("add-to-cart-btn");

//     const $quantityToCartBtn = document.createElement("span");
//     $quantityToCartBtn.classList.add("quantity-to-cart-btn");
//     $quantityToCartBtn.classList.add("hidden");

//     const $quantityToCartBtnImgPlus = document.createElement("img");
//     $quantityToCartBtnImgPlus.src = `/images/Add to Cart - Add Icon.svg`;
//     const $quantityToCartBtnImgMoins = document.createElement("img");
//     $quantityToCartBtnImgMoins.src = `/images/moins.svg`;

//     const $addToCartBtnImg = document.createElement("img");
//     $addToCartBtnImg.src = `/images/carbon_shopping-cart-plus.svg`;
//     $addToCartBtn.textContent = "Ajouter au panier";
//     $addToCartBtn.addEventListener("click", function (e) {
//       pizzaItem = $pizzaItem;
//       currentProduct = product;
//       document.querySelector(".empty-basket").classList.add("hidden");
//       addToOrder(pizzaItem.getAttribute("data-id"));
//     });

//     $quantityToCartBtnImgPlus.addEventListener("click", function (e) {
//         pizzaItem = $pizzaItem
//       addAndRemoveRefresh("plus",$pizzaItem, e.target);
//     });

//     $quantityToCartBtnImgMoins.addEventListener("click", function (e) {
//         pizzaItem = $pizzaItem
//         addAndRemoveRefresh("moins",$pizzaItem, e.target)
//     });

//     const $pizzaInfos = document.createElement("ul");
//     $pizzaInfos.classList.add("pizza-infos");

//     const $pizzaName = document.createElement("li");
//     $pizzaName.classList.add("pizza-name");
//     $pizzaName.textContent = `${product.name}`;

//     const $pizzaPrice = document.createElement("li");
//     $pizzaPrice.classList.add("pizza-price");
//     $pizzaPrice.textContent = `$${product.price}`;

//     $pizzaWrapper.appendChild($pizzaItem);
//     $pizzaItem.appendChild($pizzaPicture);
//     $pizzaItem.appendChild($addToCartBtn);
//     $pizzaItem.appendChild($quantityToCartBtn);
//     $addToCartBtn.appendChild($addToCartBtnImg);
//     $quantityToCartBtn.textContent = "1";
//     $quantityToCartBtn.appendChild($quantityToCartBtnImgMoins);
//     $quantityToCartBtn.appendChild($quantityToCartBtnImgPlus);
//     $pizzaItem.appendChild($pizzaInfos);
//     $pizzaInfos.appendChild($pizzaName);
//     $pizzaInfos.appendChild($pizzaPrice);
//   });
// }

function addToOrder(dataId, pizza, $addBtn, $quantityBtn) {
  console.log(pizza);
  currentBasket.push({
    id: dataId,
    quantity: quantityProductBasket,
    price: pizza.price,
  });
  currentBasket.forEach(function (item) {
    if (dataId === item.id) {
      $addBtn.classList.add("hidden");
      $quantityBtn.classList.remove("hidden");
    } else {
      $addBtn.classList.remove("hidden");
      $quantityBtn.classList.add("hidden");
    }
  });

  const $basketProductItem = document.createElement("li");
  $basketProductItem.classList.add("basket-product-item");

  const $basketProductItemName = document.createElement("span");
  $basketProductItemName.classList.add("basket-product-item-name");
  $basketProductItemName.textContent = `${pizza.name}`;

  const $basketProductDetails = document.createElement("span");
  $basketProductDetails.classList.add("basket-product-details");

  const $basketProductDetailsQuantity = document.createElement("span");
  $basketProductDetailsQuantity.classList.add(
    "basket-product-details-quantity"
  );

  const $basketProductDetailsUnitPrice = document.createElement("span");
  $basketProductDetailsUnitPrice.classList.add(
    "basket-product-details-unit-price"
  );

  $basketProductDetailsUnitPrice.textContent = `$${pizza.price}`;

  const $basketProductDetailsTotalPrice = document.createElement("span");
  $basketProductDetailsTotalPrice.classList.add(
    "basket-product-details-total-price"
  );
  $basketProductDetailsTotalPrice.textContent = `$${pizza.price}`;

  const $basketProductRemoveIcon = document.createElement("img");
  $basketProductRemoveIcon.classList.add("basket-product-remove-icon");
  $basketProductRemoveIcon.src = `/images/remove-icon.svg`;
  $basketProductRemoveIcon.setAttribute("data-id", dataId)
  $basketProductRemoveIcon.addEventListener("click", function (e) {
    basketProductItem = $basketProductItem;
    removeOrder($addBtn, $quantityBtn, $basketProductItem, $basketProductRemoveIcon);
  });

  $basketProducts.appendChild($basketProductItem);
  $basketProductItem.appendChild($basketProductItemName);
  $basketProductItem.appendChild($basketProductDetails);
  $basketProductDetails.appendChild($basketProductDetailsQuantity);
  $basketProductDetails.appendChild($basketProductDetailsUnitPrice);
  $basketProductDetails.appendChild($basketProductDetailsTotalPrice);
  $basketProductItem.appendChild($basketProductRemoveIcon);
}

function removeOrder($addBtn, $quantityBtn, $basketProductItem, $basketProductRemoveIcon) {
  $basketProductItem.classList.add("hidden");
  const idButtonRemove = $basketProductRemoveIcon.getAttribute("data-id")
  console.log($addBtn, $quantityBtn)
  currentBasket.forEach(item => {
    if (idButtonRemove === item.id) {
      $addBtn.classList.remove("hidden");
      $quantityBtn.classList.add("hidden");
    }
    console.log(item.id)
    console.log(idButtonRemove)
    let currentBasketPanier = currentBasket.filter((i) => i.id !== idButtonRemove);
    console.log(currentBasketPanier);
    // const newBasket = noOrder(item);
    // console.log(newBasket)
  });
}

function noOrder(item) {
  return currentBasket.filter((elt) => elt.id !== item.id);
}   

function addAndRemoveRefresh(value, pizzaItemTarget, target) {;
}

function addAndRemove(value, $basketProductDetailsQuantity, $pizzaItem) {
  if (value === "plus") {
    const idItem = $pizzaItem.getAttribute("data-id");
    currentBasket.forEach(function (item) {
      if (item.id === idItem) {
        item.quantity = item.quantity + 1;

        $basketProductDetailsQuantity.textContent = `${item.quantity}x`;
      }
      console.log(item);
    });
    refreshOrder("plus");
  }

  if (value === "moins") {
    const idItem = $pizzaItem.getAttribute("data-id");
    currentBasket.forEach(function (item) {
      if (item.id === idItem) {
        item.quantity = item.quantity - 1;

        $basketProductDetailsQuantity.textContent = `${item.quantity}x`;
      }
      console.log(item);
      currentBasketPanier = currentBasket.filter((i) => i.quantity !== 0);
    });
    refreshOrder("moins");
  }
}

function refreshOrder() {}
