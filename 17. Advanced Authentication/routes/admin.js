const express = require("express");
const app = express();
const path = require("path");

const router = express.Router();

const rootDir = require("../util/path");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

// /admin/add-product get
router.get("/add-product", isAuth, adminController.getAddproduct);

// /admin/products get

router.get("/products", adminController.getProducts);

// /admin/add-product post
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

exports.routes = router;
