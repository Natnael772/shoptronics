const bcrypt = require("bcryptjs");

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

  //checking if user exists with that email
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        req.flash("error", "invalid email or password");
        return res.redirect("/login");
      }
    
    //checking for password
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log(req.session);
            
            //store session
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
  
  //checking if user exists with that email
  User.findOne({ where: { email: email } }).then((userDoc) => {
    if (userDoc) {
      req.flash("error", "E-mail already exists, Use a different one.");
      return res.redirect("/signup");
    }
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
      //create user
        const user = new User({
          email: email,
          password: hashedPassword,
        });

      //store(save) the user
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
