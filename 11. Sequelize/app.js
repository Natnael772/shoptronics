const express = require("express");
const app = express();
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop.js");

const productsController = require("./controllers/shop");
const errController = require("./controllers/error");

const db = require("./util/database");
console.log(db);
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

// app.use("/", (req, res, next) => {
//   console.log("This one always runs");
//   next();
// });

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use(errController.get404Error);

// const server = http.createServer(app);
//in expressjs listen() does create http server
app.listen(8080, function (err) {
  if (err) console.log("Error occured");
  console.log("Server running on port 8080");
});
