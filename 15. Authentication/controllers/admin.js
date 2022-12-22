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
    isAuthenticated: req.session.isLoggedIn,
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

  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId:req.user.id
  // }
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      // console.log(req.user);
      // console.log(result);
      res.redirect("/");
      // console.log("redirected");
    })
    .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  // db.execute("SELECT * FROM products").then(()=>{
  //   res.redirect("/");
  // }).catch(err=>console.log(err))

  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
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

  // Product.findByPk(prodId);

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
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.findAll({ where: { id: prodId } })
  //   .then((product) => {
  //     console.log(product);

  //     res.render("admin/edit-product", {
  //       productId: prodId,
  //       docTitle: product[0].title,
  //       path: "/admin/edit-product",
  //       editing: editMode,
  //       product: product[0],
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  // });
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
  // res.redirect("/");

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
//   Product.destroy({ where: { id: prodId } })
//     .then((result) => {
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {});
// };
