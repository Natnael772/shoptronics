//what the user sees

const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  // console.log("In another middleware");

  //res.send() sets header of content-type : text/html by default
  console.log(req.method);

  //unless we use path module, ("/views/shop") will look for the root folder on os(C://) , not our project folder

  //   res.sendFile("./views/shop.html");
  //we can't write absolute location of a file manually because it varies across d/t os / in linux \ in windows
  //works for all os
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // res.setHeader("Content-Type", "text/html");
  // res.write("<html><body><h1>Midleware - response<body></html>");
});
module.exports = router;
