const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const middleware = require("../utils/middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const sharp = require("sharp");

usersRouter.get("/", middleware.addDecodedUserToReqObject, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get("/me", middleware.addUserToReqObject, async (req, res) => {
  const { user } = req;

  res.json(user);
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
      res.status(400).json({ error: "already not following this user" });
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

usersRouter.post(
  "/profile-image",
  upload.single("profileImage"), // fieldName needs to be the same as name in formData.append() on the frontend
  middleware.addUserToReqObject,
  async (req, res) => {
    const { user } = req;

    if (!req.file) {
      res.status(400).json({ error: "no image uploaded" });
      return;
    }

    const TEN_MEGABYTES = 1024 * 1024 * 10;

    if (req.file.size > TEN_MEGABYTES) {
      res
        .status(400)
        .json({ error: "image must be max 10 MB, use a smaller image!" });
      return;
    }

    const compressedImageBuffer = await sharp(req.file.buffer)
      .resize(100)
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    user.profileImage = {
      data: compressedImageBuffer,
      contentType: "image/jpeg",
    };

    await user.save();

    res.json({
      message: "profile image uploaded successfully",
      username: user.username,
    });
  }
);

usersRouter.put(
  "/description",
  middleware.addDecodedUserToReqObject,
  async (req, res) => {
    const { description } = req.body;
    const { decodedUser } = req;

    const updatedUser = await User.findByIdAndUpdate(
      decodedUser.id,
      { description },
      { returnDocument: "after", runValidators: true } //"after" returns updated document (default is the document before the update), and runValidators: true checks that description is not longer than allowed
    );

    if (updatedUser) {
      res.json({
        username: updatedUser.username,
        description: updatedUser.description,
      });
    } else {
      res.status(404).json({ error: "user not found" });
      return;
    }
  }
);

module.exports = usersRouter;
