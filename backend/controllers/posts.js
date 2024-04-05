// const jwt = require("jsonwebtoken");
const postsRouter = require("express").Router();
const Post = require("../models/post");
// const User = require("../models/user");
const middleware = require("../utils/middleware");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

postsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const { text } = req.body;
    const { user } = req;

    const post = new Post({
      text,
      user: user._id,
    });

    const savedPost = await post.save();

    user.posts = [...user.posts, savedPost._id];
    await user.save();

    res.status(201).json(savedPost);
  }
);

module.exports = postsRouter;
