const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error"),
  });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        req.flash("error", "invalid email or password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log(req.session);
            return req.session.save((err) => {
              console.log("redirected");
              res.redirect("/");
            });
          }

          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    docTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ where: { email: email } }).then((userDoc) => {
    if (userDoc) {
      return res.redirect("/signup");
    }
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
        });

        return user.save().then(() => {
          user.createCart();
          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log(req.session);
          return req.session.save((err) => {
            console.log("redirected");
            res.redirect("/");
          });
        });
      })
      .catch((err) => console.log(err));
  });
};
