const bcrypt = require("bcrypt");
const User = require("../database/models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;
  // try to find the user

  User.findOne({ email }, (error, user) => {
    if (user) {
      // compare user password.

      bcrypt.compare(password, user.password, (error, result) => {
        if (same) {
          // store user session

          res.direct("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    }
  });

  // if user password is correct, then, login user.

  // else

  // redirect user back.

  res.redirect("/");
};
