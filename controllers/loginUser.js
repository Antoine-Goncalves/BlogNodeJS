const User = require("../database/models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;
  // try to find the user

  // compare user password.

  // if user password is correct, then, login user.

  // else

  // redirect user back.

  res.redirect("/");
};
