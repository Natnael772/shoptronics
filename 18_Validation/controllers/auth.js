const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { DATE } = require("sequelize");

const { validationResult } = require("express-validator/check");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
const User = require("../models/user");
const { message } = require("statuses");

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
  const errors = validationResult(req);

  //if there is error in the form  entry
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      docTitle: "Signup",
      errorMessage: errors.array()[0].msg,
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });

      return user.save().then((result) => {
        // transporter.sendMail({
        //   to: email,
        //   from: "natnaeldeyas0@gmail.com",
        //   subject: "Signup succeeded",
        //   html: "<h1>You successfully signed up</h1>",
        // });

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
};
exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  res.render("auth/reset", {
    docTitle: "Reset",
    path: "/reset",
    errorMessage: message,
  });
};
exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    console.log(`Token ${token}`);
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        console.log(user);
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        console.log(`resettoken ${user.resetToken}`);
        user.resetTokenExpiration = Date.now() + 7200000;
        console.log(`resetTokenExp ${user.resetTokenExpiration}`);
        return user.save();
      })
      .then((result) => {
        console.log(result);
        // res.redirect("/");
        res.render("auth/click-to-reset.ejs", {
          path: "/click-to reset",
          docTitle: "Reset",
          token: token,
        });
        // transporter.sendMail({
        //   to: req.body.email,
        //   from: "natnaeldeyas0@gmail.com",
        //   subject: "Password reset",
        //   html: `
        //     <p>You requested a password reset</p>
        //     <p>Click this <a href="http://localhost:8000/reset/${token}">link</a> to set a new password.</p>
        //   `,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  let message = req.flash("error");
  console.log(`mytoken : ${token}`);

  // User.findOne({
  //   where: { resetToken: token, resetTokenExpiration: { $gt: Date.now() } },
  // })
  User.findOne({
    where: { resetToken: token },
  })
    .then((user) => {
      console.log("user found");
      console.log(user);
      res.render("auth/new-password", {
        path: "/new-password",
        docTitle: "Reset Password",
        errorMessage: message,
        userId: user.id,
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
};
exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  console.log(newPassword);
  console.log(req.body);

  User.findOne({ where: { resetToken: passwordToken }, id: userId })
    .then((user) => {
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
