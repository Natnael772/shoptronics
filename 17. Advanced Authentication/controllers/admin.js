const db = require("../util/database");
const Product = require("../models/product");

exports.getAddproduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }

  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Products",
        path: "/admin/products",
   
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const prodId = req.params.productId;
  console.log(prodId);

  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) {
    res.redirect("/");
  }

  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      console.log(product);
      if (!products) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        docTitle: "Edit product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const prodId = req.body.productId;
  console.log(prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("Updated successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findById(prodId, (product) => {});
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
