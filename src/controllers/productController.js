// Product controller
const fetch = require("node-fetch");
let products = [];

let hero = require('../../public/data/hero-products.json')

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

  const getProductsByCategory = (cat)=>{
    let productsSortedByCategory = [...products];
    return productsSortedByCategory.filter(p => p.category == cat)
  }

const controller = {
  home: (req, resp) => {
    const prByRate = getProductsByRate();
    const prByCount = getProductsByCount();
    resp.render("home", {
      productsSortedByRate: prByRate,
      productsSortedByCount: prByCount,
      hero: hero
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

    if(product != null){

      let productByCategory = getProductsByCategory(product.category);
      resp.render("product", {
        product: product,
        productsSortedByCategory: productByCategory,
      });

    }else{
      let productsByRate = getProductsByRate();
      resp.render("product", {
        product: product,
        productsByRate: productsByRate,
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
