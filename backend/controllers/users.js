const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    res.status(400).json({ error: "password is required" });
    return;
  }
  if (password.length < 3) {
    res
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.post("/follow", middleware.addUserToReqObject, async (req, res) => {
  const { id } = req.body;
  const { user } = req;

  if (id === user._id.toString()) {
    res.status(400).json({ error: "user cannot follow oneself" });
    return;
  }

  if (user.following.includes(id)) {
    res.status(400).json({ error: "already following this user" });
    return;
  }

  const userToFollow = await User.findById(id);

  if (!userToFollow) {
    res.status(400).json({ error: "user to follow not found" });
    return;
  }

  user.following = [...user.following, userToFollow._id];
  userToFollow.followedBy = [...userToFollow.followedBy, user._id];

  await userToFollow.save();
  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.post(
  "/unfollow",
  middleware.addUserToReqObject,
  async (req, res) => {
    const { id } = req.body;
    const { user } = req;

    if (!user.following.includes(id)) {
      res.status(400).json({ error: "not following this user" });
      return;
    }

    const userToUnfollow = await User.findById(id);

    if (!userToUnfollow) {
      res.status(400).json({ error: "user to unfollow not found" });
      return;
    }

    user.following = user.following.filter(
      (followedUser) => id !== followedUser._id.toString()
    );

    userToUnfollow.followedBy = userToUnfollow.followedBy.filter(
      (followedBy) => followedBy.toString() !== user._id.toString()
    );

    await userToUnfollow.save();
    const savedUser = await user.save();

    res.json(savedUser);
  }
);

module.exports = usersRouter;
