// Product controller
let hero = require("../../public/data/hero-products.json");

const {
  getProducts,
  getCart,
  getProductById,
} = require("../services/productsAPI");

// Ordena el array de productos aleatoriamente
const getRandomProducts = (products) => {
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
const getProductsByRate = (products) => {
  products.sort((a, b) => {
    return b.rating.rate - a.rating.rate;
  });
  if (products.length > 4) {
    return products.slice(1, 5);
  }
  return products;
};

// Función que retorna array con lista de productos ordenados por count desc
const getProductsByCount = (products) => {
  products.sort((a, b) => {
    return b.rating.count - a.rating.count;
  });
  if (products.length > 8) {
    return products.slice(1, 9);
  }
  return products;
};

const getProductsByCategory = (cat, id, products) => {
  if (products.length > 4) {
    return products.filter((p) => p.category == cat && p.id != id).slice(1, 5);
  }
  return products.filter((p) => p.category == cat);
};

const getProductsCart = (userCart, products) => {
  userCart.forEach((cartP) => {
    cartP.product = products.find((p) => p.id === cartP.id);
  });
  return userCart;
};

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
    const userCart = getProductsCart(cart, products);
    resp.render("cart", {
      products: userCart,
    });
  },

  product: async (req, resp) => {
    let id = req.params.id;
    const [products, product] = await Promise.all([
      getProducts(),
      getProductById(id),
    ]);
    if (product != null) {
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
        product: product,
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
