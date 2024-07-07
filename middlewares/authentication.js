const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
    //const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const checkUser = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
