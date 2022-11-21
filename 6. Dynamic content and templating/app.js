// const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop.js");

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//express function exports a function called e ,  and we stored thea function in app.
//the function e has lot of functionalities inside it
//expressjs is all about middleware (b/n request and response)

//use() allow us add a new middleware  function

//next() allows the request to travel to the next middleware top to bototm.
//if we don't call next() the request can't continue its journey and it stops.

//parse the incoming request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  console.log("This one always runs");
  next();
});

//order matters
//the imported router returns object. and we use it as middleware function importing it.

//routing
// app.use(adminRoutes);
// app.use(shopRoutes);

//we can also filter path
//adds ./admin to the path of adminRoutes so that we don't have to write /admin repeatedly in admin.js
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // if (res.statusCode == 404) {
  //   console.log("404 error");
  // }
  res
    .status(404)
    .render("404error", { docTitle: "404 Page not Found", path: "/404error" });
});

// const server = http.createServer(app);
//in expressjs listen() does create http server
app.listen(8080, function (err) {
  if (err) console.log("Error occured");
  console.log("Server running on port 8080");
});
