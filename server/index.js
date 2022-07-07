require("dotenv").config({ debug: true });
const express = require("express");
const handleErrors = require("./middlewares/error-handler");
const {authenticate} = require("./middlewares/auth");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const { connectToDb } = require("./db");
const server = express();

const port = process.env.PORT || 5000;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authController);
server.use("/api/users", authenticate, userController);

server.use(handleErrors);

connectToDb((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  server.listen(port, (err) => {
    if (err) throw err;
    console.log("listening to port", port);
  });
});
