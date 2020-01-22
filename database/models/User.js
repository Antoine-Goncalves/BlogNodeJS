const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

UserSchema.pre("save", function(next) {});

module.exports = mongoose.model("User", UserSchema);
