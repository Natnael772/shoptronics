const express = require("express");
const app = express();
const router = express.Router();
const db = require("../util/database");

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
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

router.get("/orders", shopController.getOrders);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDelete);

// router.get("add-to-cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);
module.exports = router;
