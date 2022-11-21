const express = require("express");
const app = express();
const path = require("path");

const router = express.Router();

const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

// /admin/add-product get
router.get("/add-product", adminController.getAddproduct);

// /admin/products get

router.get("/products", adminController.getProducts);

// /admin/add-product post
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/delete-product", adminController.getDeleteProduct);

exports.routes = router;
