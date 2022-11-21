const express = require("express");
const app = express();
const path = require("path");

//express router
//router is instance of complete middleware and routing system, It is often called "mini-express-app"
const router = express.Router();

const rootDir = require("../util/path");

//admin handles adding the product
//adding product

//router works the same as app
//app.use() vs app.get() or app.post()
//app.use runs for any incoming http method , and app.get runs for get requiests only

// /admin/add-product => get
router.get("/add-product", (req, res, next) => {
  console.log("In the middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
  // we can also write
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

//executes if the request is post
//app.get() or router.post() for get requests

// /admin/add-product => post
router.post("/add-product", (req, res, next) => {
  console.log("post method");
  res.redirect("/");
  console.log(res.statusCode);
  console.log(req.body);
  console.log("Redirected");

  // res.send("Accepted");
});
module.exports = router;
