const postsRouter = require("express").Router();
const Post = require("../models/post");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

module.exports = postsRouter;
