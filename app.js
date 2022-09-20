const express = require("express");
const app = express();
const route = require("./src/routes/productRoute");

const port = 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");

app.listen(port, () => {
  console.log("listening on port " + port);
});

app.use("/", route);

app.use("/register", route);

app.use("/login", route);

app.use("/cart", route);

app.use("/products/:id", route);

app.use("/checkout", route);

app.use('*', route);

