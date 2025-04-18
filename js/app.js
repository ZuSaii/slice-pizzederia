//HTML ELEMENTS
const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
const $basketProducts = document.querySelector(".basket-products");
const $basketTotalQuantity = document.querySelector("h2");
const $ordalModalWrapper = document.querySelector(".order-modal-wrapper")
const $orderDetail = document.querySelector(".order-detail")

//HTML BUTTONS/SELECT/INPUT/ANCRE
const $confirmOrderBtn = document.querySelector(".confirm-order-btn")
const $newOrderBtn = document.querySelector(".new-order-btn")

//PARAMETRES
let resultsApi;
let quantityProductBasket = "1"
let currentBasketPanier;
let currentProduct;
let pizzaDataNew
let currentBasket = [];

async function getProducts() {
  const res = await fetch("https://prime-garfish-currently.ngrok-free.app/products", {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "1",
      "Content-Type": "application/json",
    },
    redirect: "follow"
  });
  const data = await res.json();
  return data;
}

function finalAmount() {
    let totalPriceAmount = 0

    currentBasket.forEach(function (item) {
        totalPriceAmount = totalPriceAmount + item.price
    })


    document.querySelector(".total-order-price").textContent = `$${totalPriceAmount}`
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
  $quantityToCartBtn.setAttribute("data-id", product.id);

  const $quantityToCartBtnNumber = document.createElement("span")
  $quantityToCartBtnNumber.classList.add("quantity-to-cart-btn-number")
  $quantityToCartBtnNumber.textContent = "1"

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
  $quantityToCartBtn.appendChild($quantityToCartBtnNumber)
  $quantityToCartBtn.appendChild($quantityToCartBtnImgMoins);
  $quantityToCartBtn.appendChild($quantityToCartBtnImgPlus);
  $pizzaItem.appendChild($pizzaInfos);
  $pizzaInfos.appendChild($pizzaName);
  $pizzaInfos.appendChild($pizzaPrice);

  return [$pizzaItem, $quantityToCartBtnImgMoins, $quantityToCartBtnImgPlus];
}

async function main() {
  const pizzaData = await getProducts();
  pizzaDataNew = await pizzaData

  pizzaData.forEach((pizza) => {
    const [$pizzaItem, $quantityToCartBtnImgMoins, $quantityToCartBtnImgPlus] =
      createPizzaCart(pizza);

    $pizzaWrapper.appendChild($pizzaItem);

    $pizzaItem
      .querySelector(".add-to-cart-btn")
      .addEventListener("click", function (e) {
        document.querySelector(".empty-basket").classList.add("hidden");
        addToOrder(
          $pizzaItem.getAttribute("data-id"),
          pizza,
          $pizzaItem.querySelector(".add-to-cart-btn"),
          $pizzaItem.querySelector(".quantity-to-cart-btn")
        );
      });
    $quantityToCartBtnImgMoins.addEventListener("click", (e) => {
      addAndRemove("moins", pizza, pizza.price, $pizzaItem.querySelector(".add-to-cart-btn"), $pizzaItem.querySelector(".quantity-to-cart-btn"));
    });
    $quantityToCartBtnImgPlus.addEventListener("click", (e) => {
      addAndRemove("plus", pizza, pizza.price, $pizzaItem.querySelector(".add-to-cart-btn"), $pizzaItem.querySelector(".quantity-to-cart-btn"));
    });
  });
}

main();

function addToOrder(dataId, pizza, $addBtn, $quantityBtn) {
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
  $basketProductItem.setAttribute("data-id", dataId);

  const $basketProductItemName = document.createElement("span");
  $basketProductItemName.classList.add("basket-product-item-name");
  $basketProductItemName.textContent = `${pizza.name}`;

  const $basketProductDetails = document.createElement("span");
  $basketProductDetails.classList.add("basket-product-details");

  const $basketProductDetailsQuantity = document.createElement("span");
  $basketProductDetailsQuantity.classList.add(
    "basket-product-details-quantity"
  );
  $basketProductDetailsQuantity.textContent = "1x";

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
  $basketProductRemoveIcon.setAttribute("data-id", dataId);
  $basketProductRemoveIcon.addEventListener("click", function (e) {
    basketProductItem = $basketProductItem;
    removeOrder(
      $addBtn,
      $quantityBtn,
      $basketProductItem,
      $basketProductRemoveIcon
    );
  });

  $basketProducts.appendChild($basketProductItem);
  $basketProductItem.appendChild($basketProductItemName);
  $basketProductItem.appendChild($basketProductDetails);
  $basketProductDetails.appendChild($basketProductDetailsQuantity);
  $basketProductDetails.appendChild($basketProductDetailsUnitPrice);
  $basketProductDetails.appendChild($basketProductDetailsTotalPrice);
  $basketProductItem.appendChild($basketProductRemoveIcon);
  finalAmount()
}

function removeOrder($addBtn, $quantityBtn, $basketProductItem, $basketProductRemoveIcon) {
  const idButtonRemove = $basketProductRemoveIcon.getAttribute("data-id");
  $basketProductItem.remove();
  $addBtn.classList.remove("hidden")
  $quantityBtn.classList.add("hidden")
  currentBasket = currentBasket.filter((i) => i.id !== idButtonRemove);
  console.log(currentBasket);
  finalAmount()
}

function addAndRemove(value, $pizzaItem, price, $addBtn, $quantityBtn) {
  let id = $pizzaItem.id;

  basketProductItem = document.querySelector(
    `.basket-product-item[data-id="${id}"]`
  );

  console.log(basketProductItem);
  const basketProductDetailsQuantity = basketProductItem.querySelector(
    ".basket-product-details-quantity"
  );

  const basketProductDetailsTotalPrice = basketProductItem.querySelector(".basket-product-details-total-price")

  const quantityToCartId = document.querySelector(`.quantity-to-cart-btn[data-id="${id}"]`)
  
  const quantityToCart = quantityToCartId.querySelector(".quantity-to-cart-btn-number")

  if (value === "plus") {
    currentBasket.forEach(function (item) {
      if (item.id === id) {
        item.quantity++;
        item.price = item.price + price
        basketProductDetailsQuantity.textContent = `${item.quantity}x`
        quantityToCart.textContent = item.quantity;
        basketProductDetailsTotalPrice.textContent = `$${item.price}`
      }
    });
  }

  if (value === "moins") {
    currentBasket.forEach(function (item) {
      if (item.id === id) {
        item.quantity--;
        item.price = item.price-price
        basketProductDetailsQuantity.textContent = `${item.quantity}x`;
        quantityToCart.textContent = item.quantity
        basketProductDetailsTotalPrice.textContent = `$${item.price}`
      }
      currentBasket = currentBasket.filter((i) => i.quantity !== 0);
      if (item.quantity === 0) {
        $addBtn.classList.remove("hidden")
        $quantityBtn.classList.add("hidden")
        quantityToCart.textContent = "1"
        basketProductItem.remove();
      }
    });
  }
  finalAmount()
}

$confirmOrderBtn.addEventListener("click", function(e) {
    confirmOrder()
})

function confirmOrder() {
    if (currentBasket.length < 1) {
        console.log("Une erreur est survenue vérifier bien que vous avez au moins une pizza dans votre panier !")
        return
    }

    $ordalModalWrapper.classList.remove("hidden")

    currentBasket.forEach(item => {
        let pizza

        pizzaDataNew.forEach(p => {
            if (p.id === item.id) {
                pizza = p
            }
        })

        if (pizza === null) return

        const $orderDetailProductItem = document.createElement("li")
        $orderDetailProductItem.classList.add("order-detail-product-item")

        const $orderDetailProductImage = document.createElement("img")
        $orderDetailProductImage.classList.add("order-detail-product-image")
        $orderDetailProductImage.src = pizza.image
        
        const $orderDetailProductName = document.createElement("span")
        $orderDetailProductName.classList.add("order-detail-product-name")
        $orderDetailProductName.textContent = pizza.name

        const $orderDetailProductQuantity = document.createElement("span")
        $orderDetailProductQuantity.classList.add("order-detail-product-quantity")
        $orderDetailProductQuantity.textContent = `${item.quantity}x`

        const $orderDetailProductUnitPrice = document.createElement("span")
        $orderDetailProductUnitPrice.classList.add("order-detail-product-unit-price")
        $orderDetailProductUnitPrice.textContent = `$${(item.price / item.quantity)}`

        const $orderDetailProductTotalPrice = document.createElement("span")
        $orderDetailProductTotalPrice.classList.add("order-detail-product-total-price")
        $orderDetailProductTotalPrice.textContent = `$${item.price}`

        $orderDetailProductItem.appendChild($orderDetailProductImage)
        $orderDetailProductItem.appendChild($orderDetailProductName)
        $orderDetailProductItem.appendChild($orderDetailProductQuantity)
        $orderDetailProductItem.appendChild($orderDetailProductUnitPrice)
        $orderDetailProductItem.appendChild($orderDetailProductTotalPrice)

        $orderDetail.appendChild($orderDetailProductItem)
    })
    let finalPriceOrder = 0
    currentBasket.forEach(function(item){
        finalPriceOrder = finalPriceOrder + item.price
    })

    const $orderDetailTotalPrice = document.createElement("li")
    $orderDetailTotalPrice.classList.add("order-detail-total-price")

    const $totalOrderTitle = document.createElement("span")
    $totalOrderTitle.classList.add("total-order-title")
    $totalOrderTitle.textContent = "Order total"

    const $totalOrderPrice = document.createElement("span")
    $totalOrderPrice.classList.add("total-order-price")
    $totalOrderPrice.textContent = `$${finalPriceOrder}.00`

    $orderDetailTotalPrice.appendChild($totalOrderTitle)
    $orderDetailTotalPrice.appendChild($totalOrderPrice)

    $orderDetail.appendChild($orderDetailTotalPrice)
}

$newOrderBtn.addEventListener("click", (e) => {
    $ordalModalWrapper.classList.add("hidden")
    currentBasket = []
    $basketProducts.innerHTML = ""
    document.querySelectorAll(".quantity-to-cart-btn").forEach(quantityBtn => {
        quantityBtn.classList.add("hidden")
        quantityBtn.querySelector(".quantity-to-cart-btn-number").textContent = "1"
    })

    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.classList.remove("hidden")
    })

    $orderDetail.innerHTML = ""

    document.querySelector(".total-order-price").textContent = "$0"

    document.querySelector(".empty-basket").classList.remove("hidden")
})