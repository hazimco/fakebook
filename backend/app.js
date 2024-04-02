const express = require("express");
const usersRouter = require("./controllers/users");
const mongoose = require("mongoose");
const config = require("./utils/config");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", usersRouter);

module.exports = app;
