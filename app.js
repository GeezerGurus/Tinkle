const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");

const app = express();

require("dotenv").config();

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

module.exports = app;
