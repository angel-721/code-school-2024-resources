const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE);

// This is the Mongoose Schema
const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "User MUST have an email."],
  },
  name: {
    type: String,
    required: [true, "User MUST have a name."],
  },
  password: {
    type: String,
    required: [true, "User MUST have a password."],
  },
  username: {
    type: String,
    required: [true, "User MUST have a username."],
  },
  account_age: {
    type: Number,
  },
});

const ServerSchema = {
  name: {
    type: String,
    required: [true, "Server MUST have a name."],
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
};

UserSchema.methods.hashPassword = async function (password) {
  try {
    let hashedPassword = await bcrypt.hash(password, 12);
    this.password = hashedPassword;
  } catch (error) {}
};

UserSchema.methods.verifyPassword = async function (password) {
  // first param is the plain password from the User
  // second param is the hashed password stored for the user
  let isGood = await bcrypt.compare(password, this.password);
  return isGood;
};

// This is the mongoose model
const User = mongoose.model("User", UserSchema);
const Server = mongoose.model("Server", ServerSchema);

// this may or may not work,IDK
module.exports = {
  User,
  Server,
};

