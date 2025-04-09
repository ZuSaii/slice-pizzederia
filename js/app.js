//HTML ELEMENTS
const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
const $basketProducts = document.querySelector(".basket-products");
const $basketTotalQuantity = document.querySelector("h2");

//HTML BUTTONS/SELECT/INPUT/ANCRE

//PARAMETRES
let quantityProductBasket = 1;
let resultsApi;
let currentBasketPanier
let idItem;
let currentProduct;
let quantityBtn;
let addBtn;
let currentBasket = [];

fetch("http://10.59.122.41:3000/products")
  .then((res) => res.json())
  .then((data) => {
    resultsApi = data;
    console.log(resultsApi);
    createProductsItems();
  })
  .catch((err) => console.log("Une erreur est survenue", err));

function createProductsItems() {
  resultsApi.forEach((product) => {
    currentProduct = product;
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
    $addToCartBtn.addEventListener("click", function (e) {
      idItem = $pizzaItem.getAttribute("data-id");
      quantityBtn = $pizzaItem.querySelector(".quantity-to-cart-btn");
      addBtn = $pizzaItem.querySelector(".add-to-cart-btn");
      currentBasket.push({
        id: idItem,
        quantity: quantityProductBasket,
        price: product.price,
      });
      console.log(currentBasket);
      currentBasket.forEach(function (item) {
        if (idItem === item.id) {
          addBtn.classList.add("hidden");
          quantityBtn.classList.remove("hidden");
        } else {
          addBtn.classList.remove("hidden");
          quantityBtn.classList.add("hidden");
        }
      });
      //   if (currentBasket[0].results.indexOf(idItem, uuid) === 1) {
      //     console.log("----");
      //     console.log(idItem);
      //     addBtn.classList.add("hidden");
      //     quantityBtn.classList.remove("hidden");
      //   } else {
      //     addBtn.classList.remove("hidden");
      //     quantityBtn.classList.add("hidden");
      //   }

      const $basketProductItem = document.createElement("li");
      $basketProductItem.classList.add("basket-product-item");

      const $basketProductItemName = document.createElement("span");
      $basketProductItemName.classList.add("basket-product-item-name");
      $basketProductItemName.textContent = `${product.name}`;

      const $basketProductDetails = document.createElement("span");
      $basketProductDetails.classList.add("basket-product-details");

      const $basketProductDetailsQuantity = document.createElement("span");
      $basketProductDetailsQuantity.classList.add("basket-product-details-quantity");

      const $basketProductDetailsUnitPrice = document.createElement("span");
      $basketProductDetailsUnitPrice.classList.add("basket-product-details-unit-price");

      $basketProductDetailsUnitPrice.textContent = `$${product.price}`;

      const $basketProductDetailsTotalPrice = document.createElement("span");
      $basketProductDetailsTotalPrice.classList.add("basket-product-details-total-price");
      $basketProductDetailsTotalPrice.textContent = "0000";

      const $basketProductRemoveIcon = document.createElement("img");
      $basketProductRemoveIcon.classList.add("basket-product-remove-icon");
      $basketProductRemoveIcon.src = `/images/remove-icon.svg`;
      $basketProductRemoveIcon.addEventListener("click", function (e) {
        $basketProductItem.classList.add("hidden");
        currentBasket.forEach(function (item) {
          if (idItem === item.id) {
            addBtn.classList.remove("hidden");
            quantityBtn.classList.add("hidden");
          } else {
            addBtn.classList.add("hidden");
            quantityBtn.classList.remove("hidden");
          }
          let currentBasketPanier = currentBasket.filter((i) => i.id !== idItem);
          console.log(currentBasketPanier);
        });
      });

      $quantityToCartBtnImgPlus.addEventListener("click", function (e) {
        const idItem = $pizzaItem.getAttribute("data-id");
        currentBasket.forEach(function (item) {
          if (item.id === idItem) {
            item.quantity = item.quantity + 1;

            $basketProductDetailsQuantity.textContent = `${item.quantity}x`;
          }
          console.log(item);
        });
      });

      $quantityToCartBtnImgMoins.addEventListener("click", function (e) {
        const idItem = $pizzaItem.getAttribute("data-id");
        currentBasket.forEach(function (item) {
          if (item.id === idItem) {
            item.quantity = item.quantity - 1;

            $basketProductDetailsQuantity.textContent = `${item.quantity}x`;
          }
          console.log(item);
          currentBasketPanier = currentBasket.filter((i) => i.quantity !== 0)
        });
      });

      $basketProducts.appendChild($basketProductItem);
      $basketProductItem.appendChild($basketProductItemName);
      $basketProductItem.appendChild($basketProductDetails);
      $basketProductDetails.appendChild($basketProductDetailsQuantity);
      $basketProductDetails.appendChild($basketProductDetailsUnitPrice);
      $basketProductDetails.appendChild($basketProductDetailsTotalPrice);
      $basketProductItem.appendChild($basketProductRemoveIcon);
    });

    const $pizzaInfos = document.createElement("ul");
    $pizzaInfos.classList.add("pizza-infos");

    const $pizzaName = document.createElement("li");
    $pizzaName.classList.add("pizza-name");
    $pizzaName.textContent = `${product.name}`;

    const $pizzaPrice = document.createElement("li");
    $pizzaPrice.classList.add("pizza-price");
    $pizzaPrice.textContent = `$${product.price}`;

    $pizzaWrapper.appendChild($pizzaItem);
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
  });
}

function addToOrder() {}
