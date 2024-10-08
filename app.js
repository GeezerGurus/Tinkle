const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require('path');
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middlewares/authentication");

const app = express();

require("dotenv").config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);
app.get("*", checkUser);

module.exports = app;
