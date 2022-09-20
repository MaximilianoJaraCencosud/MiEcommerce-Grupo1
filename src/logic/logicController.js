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

module.exports = {
    getRandomProducts,
    getProductsByRate,
    getProductsByCount,
    getProductsByCategory,
    getProductsCart
}