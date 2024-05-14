const postsRouter = require("express").Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const middleware = require("../utils/middleware");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({}).populate("user", { username: 1, id: 1 });
  res.json(posts);
});

postsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400).json({ error: "post not found" });
    return;
  }

  res.json(post);
});

postsRouter.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  const comments = await Comment.find({ post: id }).populate("user", {
    username: 1,
  });

  if (!comments || comments.length === 0) {
    res
      .status(400)
      .json({ error: `no comments found for post with id: ${id}` });
    return;
  }

  res.json(comments);
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

postsRouter.post(
  "/comment",
  middleware.addUserToReqObject,
  async (req, res) => {
    const { text, id } = req.body;
    const { user } = req;

    const post = await Post.findById(id);
    if (!post) {
      res.status(400).json({ error: "post not found" });
      return;
    }

    const comment = new Comment({
      text,
      user: user._id,
      post: post._id,
    });

    await comment.save();

    post.comments = [...post.comments, comment._id];

    const savedPost = await post.save();

    res.json(savedPost);
  }
);

module.exports = postsRouter;
