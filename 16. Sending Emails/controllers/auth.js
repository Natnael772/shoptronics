const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//mail transporter
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  console.log(message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isAuthenticated: false,
    errorMessage: message,
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
          req.flash("error", "Invalid login or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
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
  let message = req.flash("error");
  console.log(message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    docTitle: "Signup",
    path: "/signup",
    errorMessage: message,
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ where: { email: email } }).then((userDoc) => {
    if (userDoc) {
      req.flash("error", "E-mail already exists, Use a different one.");
      return res.redirect("/signup");
    }
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
        });

        return user.save().then((result) => {
          transporter.sendMail({
            to: "natnaeldeyas0@gmail.com",
            from: "shop@node-complete.com",
            subject: "Signup succeeded",
            html: <h1>You successfully signed up</h1>,
          });

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
