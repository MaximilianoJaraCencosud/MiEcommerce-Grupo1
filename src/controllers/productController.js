// Product controller
const fetch = require("node-fetch");
let products = [];

let hero = require("../../public/data/hero-products.json");

fetch("http://localhost:8000/api/product")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    products = res;
  });

// Ordena el array de productos aleatoriamente  
const getRandomProducts = () => {
  let randomProducts = [];
  if (products.length > 4) {
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * products.length);
      randomProducts.includes(products[random])
        ? i--
        : randomProducts.push(products[random]);
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      let random = Math.floor(Math.random() * products.length);
      randomProducts.includes(products[random])
        ? i--
        : randomProducts.push(products[random]);
    }
  }
  return randomProducts;
};

// Función que retorna array con lista de productos ordenados por rate desc
const getProductsByRate = () => {
  let productsSortedByRate = [...products];
  productsSortedByRate.sort((a, b) => {
    return b.rating.rate - a.rating.rate;
  });
  if (productsSortedByRate.length > 4) {
    return productsSortedByRate.slice(1, 5);
  } 
  return productsSortedByRate;
};

// Función que retorna array con lista de productos ordenados por count desc
const getProductsByCount = () => {
  let productsSortedByCount = [...products];
  productsSortedByCount.sort((a, b) => {
    return b.rating.count - a.rating.count;
  });
  if (productsSortedByCount.length > 8) {
    return productsSortedByCount.slice(1, 9);
  }

  return productsSortedByCount;
};

const getProductsByCategory = (cat, id) => {
  let productsSortedByCategory = [...products];
  if (productsSortedByCategory.length > 4) {
    return productsSortedByCategory
      .filter((p) => p.category == cat && p.id!=id)
      .slice(1, 5);
  }

  return productsSortedByCategory.filter((p) => p.category == cat);
};

const controller = {
  home: (req, resp) => {
    const prByRate = getProductsByRate();
    const prByCount = getProductsByCount();
    resp.render("home", {
      productsSortedByRate: prByRate,
      productsSortedByCount: prByCount,
      hero: hero,
    });
  },
  register: (req, resp) => {
    resp.render("register");
  },
  login: (req, resp) => {
    resp.render("login");
  },
  cart: (req, resp) => {
    resp.render("cart", {
      products: products,
    });
  },
  product: (req, resp) => {
    let id = req.params.id;
    let product = products.find((p) => p.id == id);
    if (product != null) {
      let productByCategory = getProductsByCategory(product.category, product.id);
      resp.render("product", {
        product: product,
        productsSortedByCategory: productByCategory,
      });
    } else {
      let randomProducts = getRandomProducts();
      resp.render("product", {
        product: product,
        randomProducts: randomProducts,
      });
    }
  },

  checkout: (req, resp) => {
    resp.render("checkout");
  },
  error404: (req, resp) => {
    resp.status(404).render("404");
  },
};

module.exports = controller;
