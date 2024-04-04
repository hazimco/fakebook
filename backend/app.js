const express = require("express");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const postsRouter = require("./controllers/posts");
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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/posts", postsRouter);

module.exports = app;
