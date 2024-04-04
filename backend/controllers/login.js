const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "missing username or password" });
    return;
  }

  const user = await User.findOne({ username });

  const correctCredentials = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!correctCredentials) {
    res.status(401).json({ error: "invalid username or password" });
    return;
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ username: user.username, token }); //todo: I read that it might be safer to send token in cookie so that the client doesn't store it in localstorage
});

module.exports = loginRouter;
