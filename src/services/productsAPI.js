const fetch = require("node-fetch");

const getProducts = () => {
    return fetch("http://localhost:5000/api/product").then((res) => {
      return res.json();
    });
  };

  const getCart = (id) => {
   return fetch(`http://localhost:5000/api/cart/${id}`)
    .then((res) => {
      return res.json();
    })
  }

  const getProductById = (id) => {
    return fetch(`http://localhost:5000/api/product/${id}`).then((res) => {
        return res.json();
    })
  }

  module.exports = {getProducts, getCart, getProductById}