const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE);

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "User must have an email."],
  },
  name: String,
  password: {
    type: String,
    required: [true, "User must have a password."],
  },
});

UserSchema.methods.setPassword = async function (plainPassword) {
  try {
    let encryptedPassword = await bcrypt.hash(plainPassword, 12);
    this.password = encryptedPassword;
  } catch (error) {
    console.log("Invalid password, can't set password");
  }
};

UserSchema.methods.verifyPassword = async function (plainPassword) {
  let isOkay = await bcrypt.compare(plainPassword, this.password);
  return isOkay;
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User: User,
};
