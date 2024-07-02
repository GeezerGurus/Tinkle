const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
      sameSite: 'Strict',
      maxAge: maxAge * 1000 
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
      sameSite: 'Strict',
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
      const user = await User.findById({ _id: req.userId })
      if (!user) {
          return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error });
  }
};

exports.logout = async(req, res) => {
  try {
      const user = await User.findById({ _id: req.userId })
      if (user) {
        res.cookie("jwt", "", { maxAge: 1 });
        res.redirect("/"); //If logout,this redirect to home page(possible the best to login page)
      }
      else {
        return res.status(404).json({ message: "User not found!" });
      }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
