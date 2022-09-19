// Product controller
const fetch = require("node-fetch");
let products = [];

fetch("http://localhost:8000/api/product")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    products = res;
  });

  // Función que retorna array con lista de productos ordenados por rate desc
  const getProductsByRate = ()=>{
    let productsSortedByRate = [...products];
    productsSortedByRate.sort((a, b) => {
      return b.rating.rate - a.rating.rate;
    });
    return productsSortedByRate;
  }

  // Función que retorna array con lista de productos ordenados por count desc
  const getProductsByCount = ()=>{
    let productsSortedByCount = [...products];
    productsSortedByCount.sort((a, b) => {
      return b.rating.count - a.rating.count;
    });
    return productsSortedByCount;
  }

const controller = {
  home: (req, resp) => {
    const prByRate = getProductsByRate();
    const prByCount = getProductsByCount();
    resp.render("home", {
      productsSortedByRate: prByRate,
      productsSortedByCount: prByCount,
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
    const prByRate = getProductsByRate();
    resp.render("product", {
      product: product,
      productsSortedByRate: prByRate,
    });
  },
  checkout: (req, resp) => {
    resp.render("checkout");
  },
  error404: (req, resp) => {
    resp.status(404).render("404");
  },
};

module.exports = controller;
