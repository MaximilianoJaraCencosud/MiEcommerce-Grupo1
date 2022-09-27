// Product controller
let hero = require("../../public/data/hero-products.json");
let categories = require("../../public/data/categories.json");

const {
  getProducts,
  getCart,
  getProductById,
} = require("../services/productsAPI");

const {
  getRandomProducts,
  getProductsByRate,
  getProductsByCount,
  getProductsByCategory,
  getProductsCart
} = require('../logic/logicController')

const controller = {
  home: async (req, resp) => {
    const products = await getProducts();
    const prByRate = getProductsByRate(products);
    const prByCount = getProductsByCount(products);

    resp.render("home", {
      productsSortedByRate: prByRate,
      productsSortedByCount: prByCount,
      hero: hero,
      categories
    });
  },
  register: (req, resp) => {
    resp.render("register");
  },
  login: (req, resp) => {
    resp.render("login");
  },

  cart: async (req, resp) => {
      resp.render("cart");
  },

  product: async (req, resp) => {
    let id = req.params.id;
    const [products, product] = await Promise.all([
      getProducts(),
      getProductById(id),
    ]);

    if (product.status != 404) {
      let productByCategory = getProductsByCategory(
        product.category,
        product.id,
        products
      );

      resp.render("product", {
        product: product,
        productsSortedByCategory: productByCategory,
        categories
      });
    } else {
      let randomProducts = getRandomProducts(products);

      resp.render("product", {
        product: null,
        randomProducts: randomProducts,
        categories
      });
    }
  },

  checkout: (req, resp) => {
    resp.render("checkout");
  },

  error404: async (req, resp) => {
    const products = await getProducts();
    let productsByRate = getProductsByRate(products);
    resp.status(404).render("404", { productsByRate, categories });
  },
};

module.exports = controller;
