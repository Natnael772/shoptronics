const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);

  Product.findByPk(prodId).then((product) => {
    console.log(product);
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      docTitle: "Products",
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.findAll({ where: { title: "book1" } })
  //   .then((products) => {
  //     res.render("shop/index", {
  //       prods: products,
  //       docTitle: "shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            docTitle: "Your Cart",
            products: products,
            isAuthenticated: req.session.isLoggedIn,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const prod = products[0];
      console.log(prod);
      return prod.cartItem.destroy();
    })
    .then(() => {
      console.log("Deleted successfully");
      res.redirect("/cart");
    });
};

//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(prodId);
//     })
//     .then((product) => {
//       return fetchedCart.addProduct(product);
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;

//   req.user
//     .getCart((cart) => {
//       fetchedCart = cart;
//       console.log(fetchedCart);
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       // console.log(products);

//       let prod;
//       if (products) {
//         prod = products.dataValues;
//         const oldQuantity = products.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         // return product;
//       }
//       console.log(prod);
//       res.redirect("/");
//     });
// };

exports.getOrders = (req, res, next) => {
  //eager loading
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log("here is the order");
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        docTitle: "Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((prod) => {
              prod.orderItem = { quantity: prod.cartItem.quantity };
              return prod;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      console.log("Cart is cleared");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn,
  });
};
