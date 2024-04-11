const postsRouter = require("express").Router();
const Post = require("../models/post");
const middleware = require("../utils/middleware");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({}).populate("user", { username: 1, id: 1 });
  res.json(posts);
});

postsRouter.post("/", middleware.addUserToReqObject, async (req, res) => {
  const { text } = req.body;
  const { user } = req;

  const post = new Post({
    text,
    user: user._id,
  });

  await post.populate("user", { username: 1, id: 1 });

  const savedPost = await post.save();

  user.posts = [...user.posts, savedPost._id];
  await user.save();

  res.status(201).json(savedPost);
});

module.exports = postsRouter;
