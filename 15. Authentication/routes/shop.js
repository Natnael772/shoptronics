const express = require("express");
const app = express();
const router = express.Router();
const db = require("../util/database");

const isAuth = require("../middleware/is-auth");
const shopController = require("../controllers/shop");

router.get("/", isAuth, shopController.getIndex);
// router.get("/", (req, res, next) => {
//   let sql = "select * from products";
//   db.query(sql, (err, data, fields) => {
//     if (err) throw err;

//     console.log(fields);
//     res.render("shop/index", {
//       prods: data,
//       docTitle: "shop",
//       path: "/",
//     });
//   });
// });

router.get("/products", shopController.getProducts);

//put the spicific ones firest andx dynamic paths second
// router.get("/products/delete");

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart-delete-item", isAuth, shopController.postCartDelete);

router.get("/orders", isAuth, shopController.getOrders);
router.post("/create-order", isAuth, shopController.postOrder);

router.get("/checkout", isAuth, shopController.getCheckout);
module.exports = router;
