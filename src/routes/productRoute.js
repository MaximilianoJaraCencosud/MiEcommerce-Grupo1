// Product route
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.home);

router.get("/products/:id", productController.product);

router.get("/cart", productController.cart);

router.get("/checkout", productController.checkout);

router.get("/register", productController.register);

router.get("/login", productController.login);

module.exports = router;