const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    job: {
      type: String,
      required: [true, "Please enter your job"]
    },
    phoneNo: {
      type: String,
      required: [true, "Please enter a phone number"],
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(username, email, password) {
  // Check if the username exists
  const userByUsername = await this.findOne({ username });
  if (!userByUsername) {
    throw Error("incorrect username");
  }

  // Check if the email exists for the given username
  const userByEmail = await this.findOne({ username, email });
  if (!userByEmail) {
    throw Error("incorrect email");
  }

  // Validate the password
  const auth = await bcrypt.compare(password, userByEmail.password);
  if (!auth) {
    throw Error("incorrect password");
  }

  return userByEmail;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
