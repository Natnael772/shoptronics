const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    console.log(rows);
    res.render("shop/index", {
      prods: rows,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    j;
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      docTitle: "",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      console.log(rows);
      res.render("shop/index", {
        prods: rows,
        docTitle: "Shop",
        path: "/",
      });
      // console.log(fieldData);
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    docTitle: "Orders",
  });
};

exports.getCart = (req, res, next) => {
  // res.redirect("/");
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id == product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
        res.render("shop/cart", {
          path: "/cart",
          docTitle: "Your Cart",
          products: cartProducts,
        });
      }
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  // res.redirect("/");

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
    res.redirect("/");
    // res.render("shop/cart", {
    //   path: "/cart",
    //   docTitle: "Cart",
    //   products: product,
    // });
    // console.log(product.price);
  });
  // console.log(prodId);
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
  });
};
exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
