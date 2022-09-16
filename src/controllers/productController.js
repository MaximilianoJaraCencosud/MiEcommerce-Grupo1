// Product controller
let products = require("../../public/data/products.json");

const controller = {
  home: (req, resp) => {
    resp.render("home", { products: products });
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
    resp.render("product", {
      products: products,
    });
  },
  checkout: (req, resp) => {
    resp.render("checkout");
  },
  error404: (req, resp) => {
    resp.render("404");
  },
};

module.exports = controller;
