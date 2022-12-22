const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");

//initialize dsequelize with session store
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop.js");
const authRoutes = require("./routes/auth");

const productsController = require("./controllers/shop");
const errController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const Order = require("./models/order");
const OrderItem = require("./models/order-item");

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

const store = new sequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
store.sync();

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findOne({ where: { email: req.session.user.email } })
    .then((user) => {
      req.user = user;
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
app.use(authRoutes);

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

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    console.log("Synced successfully");
    app.listen(8080);
  })
  .catch((err) => console.log(err));

//sync and create table and relation
// sequelize
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       User.create({ email: "natnaeldeyas0@gmail.com", password: "123" });
//     }
//     return user;
//   })
//   .then((user) => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {
//     // console.log(cart);
//     console.log("cart created");
//     app.listen(8080);
//   })
//   .catch((err) => console.log(err));
