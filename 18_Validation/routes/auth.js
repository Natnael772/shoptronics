const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  //checks the form entries(e.g email)
  check("email").isEmail().withMessage("Please enter a valid email"),
  // I can add custom validator
  // .custom((value, { req }) => {
  //   if (value == "natnaeldeyas0@gmail.com") {
  //     throw new Error("Forbidden");
  //   }
  //  return true;
  // }),
  //checks body of the request
  body(
    "password",
    "Please enter a pwd with only numbers and text and at least 6 characters"
  )
    .isLength({ min: 6 })
    .isAlphanumeric(),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords don't match");
    }
    return true;
  }),

  authController.postSignup
);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);
module.exports = router;
