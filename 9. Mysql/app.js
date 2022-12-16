const express = require("express");
const app = express();
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop.js");

const productsController = require("./controllers/shop");
const errController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const sequelize = require("./util/database");

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log(req.user.id);
      next();
    })
    .catch((err) => console.log(err));
});

// app.use("/", (req, res, next) => {
//   console.log("This one always runs");
//   next();
// });

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use(errController.get404Error);

// const server = http.createServer(app);
//in expressjs listen() does create http server
// app.listen(8080, function (err) {
//   if (err) console.log("Error occured");
//   console.log("Server running on port 8080");
// });

//user created the product
//ondelete cascade: if the user is deleted, the product will also be gone

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//sync and create table and relation
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Natnael", email: "natnaeldeyas0@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    // console.log(cart);
    console.log("cart created");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
