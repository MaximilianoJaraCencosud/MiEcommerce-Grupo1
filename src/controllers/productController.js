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

const controller = {
  home: (req, resp) => {
    let productsSortedByRate = [...products];
    productsSortedByRate.sort((a, b) => {
      return b.rating.rate - a.rating.rate;
    });
    let productsSortedByCount = [...products];
    productsSortedByCount.sort((a, b) => {
      return b.rating.count - a.rating.count;
    });
    resp.render("home", {
      productsSortedByRate: productsSortedByRate,
      productsSortedByCount: productsSortedByCount,
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
    resp.render("product", {
      product: product,
      products: products,
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
