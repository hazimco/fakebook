const jwt = require("jsonwebtoken");
const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

postsRouter.post("/", async (req, res) => {
  const { text } = req.body;
  const { authorization } = req.headers;

  const token = authorization.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null;

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedUser.id) {
    res.status(401).json({ error: "invalid token" });
    return;
  }

  const user = await User.findById(decodedUser.id);

  if (!user) {
    res.status(404).json({ error: "user not found" });
    return;
  }

  const post = new Post({
    text,
    user: user._id,
  });

  const savedPost = await post.save();

  user.posts = [...user.posts, savedPost._id];
  await user.save();

  res.status(201).json(savedPost);
});

module.exports = postsRouter;
