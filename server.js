const { db } = require("./db/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
