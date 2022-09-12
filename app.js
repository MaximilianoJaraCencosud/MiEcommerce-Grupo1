const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("listening on port " + port);
});

app.get("/", (req, resp) => {
  resp.render("pages/home");
});

app.get("/register", (req, resp) => {
  resp.render("pages/register");
});

app.get("/login", (req, resp) => {
  resp.render("pages/login");
});

app.get("/cart", (req, resp) => {
    resp.render("pages/cart");
  });

  app.get("/products", (req, resp) => {
    resp.render("pages/product");
  });
  