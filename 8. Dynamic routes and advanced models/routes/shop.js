const express = require("express");
const app = express();
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

//put the spicific ones firest andx dynamic paths second
// router.get("/products/delete");

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);
router.post("/cart", shopController.postCart);

router.get("/checkout", shopController.getCheckout);
module.exports = router;
