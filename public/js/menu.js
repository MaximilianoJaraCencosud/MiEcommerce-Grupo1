window.addEventListener("DOMContentLoaded", function () {
  // Items del menu
  const closeSession = document.querySelector(".menu__closeSession");
  const homeLink = document.querySelector(".menu__home");
  const cartLink = document.querySelector(".menu__cart");
  const favoritesLink = document.querySelector(".menu__favorites");
  const historyLink = document.querySelector(".menu__history");

  closeSession.addEventListener("click", (e) => {
    localStorage.clear();
    window.location.href = "/";
  });

  homeLink.addEventListener("click", (e) => {
    window.location.href = "/";
  });

  cartLink.addEventListener("click", (e) => {
    window.location.href = "/cart";
  });

  favoritesLink.addEventListener("click", (e) => {
    window.location.href = "/checkout";
  });

  historyLink.addEventListener("click", (e) => {
    window.location.href = "/checkout";
  });

  let buttonMenu = document.querySelector(".user-button");
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
  let userName = document.querySelector(".menu__profile p");
  let darkModeIcon = document.querySelector(".menu__theme__icon");

  let buttonAmount = document.querySelectorAll(
    ".cart__product-card__action-amount button"
  );

  let data = localStorage.getItem("user");
  data = JSON.parse(data);
  userName.textContent = data.name;

  window.addEventListener("click", function (e) {
    if (e.target === buttonMenu);
    {
      buttonMenu.addEventListener("click", () => {
        menu.classList.add("hide");
      });
    }
    let findEtiqueta = document.querySelectorAll(".menuShow");
    let bool = false;
    for (let i = 0; i < findEtiqueta.length; i++) {
      if (findEtiqueta[i] === e.target || menu.contains(e.target)) {
        bool = true;
      }
    }
    if (bool) {
      menu.classList.add("hide");
    } else {
      menu.classList.remove("hide");
    }
  });

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
    darkModeIcon.src = "/images/sun-solid.svg";
    darkModeIcon.style = "filter: invert(100%)";
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
    darkModeIcon.src = "/images/moon-solid.svg";
    darkModeIcon.style = "filter: invert(0%)";
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
