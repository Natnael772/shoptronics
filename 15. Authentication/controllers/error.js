exports.get404Error = (req, res, next) => {
  res.status(404).render("404error", {
    docTitle: "404 Page not Found",
    path: "/404error",
    isAuthenticated: req.session.isLoggedIn,
  });
};
