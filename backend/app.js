const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const postsRouter = require("./controllers/posts");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const cors = require("cors");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
// mongoose.set("debug", true); // uncomment to see database queries in the terminal

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    "[:date[web]] :remote-addr :method :url :status :res[content-length] - :response-time ms :body"
  )
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/posts", postsRouter);

app.use(middleware.errorHandler);

module.exports = app;
