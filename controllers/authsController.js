const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", email: "", password: "" };

  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//Creating token(the second parameter from jwt.sign is signature, can be anything, being concatenated with userId and maxage. Best put db server password as signature)
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

exports.signup_post = async (req, res) => {
  const { username, email, password, job, phoneNo } = req.body;

  try {
    const user = await User.create({ username, email, password, job, phoneNo });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "Strict",
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, token: token });
    console.log(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

exports.login_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.login(username, email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "Strict",
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, token: token });
    console.log(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById( req.userId );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateEmail = async (req, res) => {
  const { newEmail } = req.body;

  try {
    const user = await User.findById( req.userId );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user.email === newEmail) {
      return res.status(400).json({ message: "New email cannot be the same as the old one!" });
    }
    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate old password
    const auth = await bcrypt.compare(oldPassword, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old one!" });
    }

    // Hash and update new password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.updateProfile = async (req, res) => {
  const { username, job, phoneNo} = req.body;
  try {
    const user =  await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (username) user.username = username;
    if (job) user.job = job;
    if (phoneNo) user.phoneNo = phoneNo;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors }); 
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    if (user) {
      return res.status(200).json({ message: "Logged out!" });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
