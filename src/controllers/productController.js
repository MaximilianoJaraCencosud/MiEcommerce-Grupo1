// Product controller
let hero = require("../../public/data/hero-products.json");

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
    });
  },
  register: (req, resp) => {
    resp.render("register");
  },
  login: (req, resp) => {
    resp.render("login");
  },

  cart: async (req, resp) => {
    const [cart, products] = await Promise.all([getCart(0), getProducts()]);
    
    if (cart.status != 404) {
      const userCart = getProductsCart(cart, products);
      resp.render("cart", {
        products: userCart,
      });
    }else{
      resp.render("cart", {
        products: null,
      });
    }
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
      });
    } else {
      let randomProducts = getRandomProducts(products);

      resp.render("product", {
        product: null,
        randomProducts: randomProducts,
      });
    }
  },

  checkout: (req, resp) => {
    resp.render("checkout");
  },

  error404: async (req, resp) => {
    const products = await getProducts();
    let productsByRate = getProductsByRate(products);
    resp.status(404).render("404", { productsByRate });
  },
};

module.exports = controller;
