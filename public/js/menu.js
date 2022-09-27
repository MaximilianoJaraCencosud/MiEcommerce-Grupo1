window.addEventListener("DOMContentLoaded", function () {
  let buttonMenu = document.querySelector(".header__profile-btn");
  let buttonMenuMobile = document.querySelector(".header__profile-img");
  let menu = document.querySelector(".menu");
  let theme = document.querySelector(".menu__theme");
  let body = document.querySelector("body");
  let inputs = document.querySelectorAll("input");
  let header = document.querySelector(".header");
  let cardProduct = document.querySelectorAll(
    ".main-product__related-product-card"
  );
  let mainProduct = document.querySelectorAll(".main-product__product");
  let cartProduct = document.querySelectorAll(".cart__product-card");
  let footer = document.querySelector(".footer");
  let accessCard = document.querySelectorAll(".access__card");
  let descLineProd = document.querySelectorAll(".desc");
  let darkModeText = document.querySelector(".menu__theme span");

  let buttonAmount = document.querySelectorAll(
    ".cart__product-card__action-amount button"
  );

  if (buttonMenu) {
    buttonMenu.addEventListener("click", () => {
      menu.classList.add("hide");
    });
  }

  if (buttonMenuMobile) {
    buttonMenuMobile.addEventListener("click", () => {
      menu.classList.add("hide");
    });
  }

  if (menu) {
    menu.addEventListener("click", () => {
      menu.classList.remove("hide");
    });
  }

  if (localStorage.getItem("darkMode") === "true") {
    modoOscuro();
    localStorage.setItem("darkMode", true);
  } else {
    modoClaro();
    localStorage.setItem("darkMode", false);
  }

  if (theme) {
    theme.addEventListener("click", () => {
      if (localStorage.getItem("darkMode") === "true") {
        modoClaro();
        localStorage.setItem("darkMode", false);
      } else {
        modoOscuro();
        localStorage.setItem("darkMode", true);
      }
    });
  }

  function modoOscuro() {
    body.classList.add("background-dark");
    header.classList.add("card-product-cart-dark");
    footer.classList.add("card-product-cart-dark");
    menu.classList.add("menu-dark");

    darkModeText.innerHTML = "Cambiar a modo Claro";

    accessCard.forEach((element) => {
      element.classList.add("card-product-dark");
    });

    inputs.forEach((element) => {
      element.classList.add("inputs-dark");
    });

    cardProduct.forEach((element) => {
      element.classList.add("card-product-dark");
    });

    mainProduct.forEach((element) => {
      element.classList.add("card-product-dark");
    });

    cartProduct.forEach((element) => {
      element.classList.add("card-product-cart-dark");
    });

    buttonAmount.forEach((element) => {
      element.classList.add("button-amount-cart");
    });

    descLineProd.forEach((element) => {
      element.classList.add("descLineProd");
    });
  }

  function modoClaro() {
    body.classList.remove("background-dark");
    header.classList.remove("card-product-cart-dark");
    footer.classList.remove("card-product-cart-dark");
    if (menu) {
      menu.classList.remove("menu-dark");
    }

    if (darkModeText) {
      darkModeText.innerHTML = "Cambiar a modo Oscuro";
    }

    accessCard.forEach((element) => {
      element.classList.remove("card-product-dark");
    });

    inputs.forEach((element) => {
      element.classList.remove("inputs-dark");
    });

    cardProduct.forEach((element) => {
      element.classList.remove("card-product-dark");
    });

    mainProduct.forEach((element) => {
      element.classList.remove("card-product-dark");
    });

    cartProduct.forEach((element) => {
      element.classList.remove("card-product-cart-dark");
    });

    buttonAmount.forEach((element) => {
      element.classList.remove("button-amount-cart");
    });

    descLineProd.forEach((element) => {
      element.classList.remove("descLineProd");
    });
  }
});
