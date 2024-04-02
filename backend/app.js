const express = require("express");
const app = express();
const usersRouter = require("./controllers/users");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", usersRouter);

module.exports = app;
