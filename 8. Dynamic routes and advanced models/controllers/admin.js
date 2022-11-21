const Product = require("../models/product");
exports.getAddproduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);

  // const editMode = req.query.edit;
  // if (!editMode) {
  //   res.redirect("/");
  // }
  // Product.findById(prodId, (product) => {
  //   res.render("admin/edit-product.ejs", {
  //     productId: prodId,
  //     docTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //   });
  // });
};
exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findById(prodId, (product) => {
    res.redirect("/");
  });
};
