const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("loginInFirst");
  }
};
module.exports = isLoggedIn;
