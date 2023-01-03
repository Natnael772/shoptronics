//what the user sees

const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
 

  //res.send() sets header of content-type : text/html by default
  console.log(req.method);

  //unless we use path module, ("/views/shop") will look for the root folder on os(C://) , not our project folder

  //   res.sendFile("./views/shop.html");
  //we can't write absolute location of a file manually because it varies across d/t os / in linux \ in windows
  //works for all os
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));

  //res.render(view, {locals}, callback)
  res.render("shop", {
    prods: adminData.products,
    docTitle: "Shop",
    path: "/",
  });
  console.log(adminData.products);

  //view : is the page to be rendered on the browser
  //Locals: It is basically an object whose properties define local variables for the view.

  // res.setHeader("Content-Type", "text/html");
  // res.write("<html><body><h1>Midleware - response<body></html>");
});
module.exports = router;
