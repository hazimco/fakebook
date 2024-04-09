if (process.env.NODE_ENV !== "test") {
  throw new Error("### NODE_ENV is not set to 'test'");
}

const Post = require("../models/post");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const testUser = new User({
  username: "testUser1",
});

const validNonExistingUserId = new User()._id;

const testPosts = [
  { text: "first test post", user: testUser._id },
  { text: "second test post", user: testUser._id },
];

const initializeTestPosts = async () => {
  await User.deleteMany({});
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("123", saltRounds);
  testUser.passwordHash = passwordHash;
  await testUser.save();
  await Post.deleteMany({});
  await Post.insertMany(testPosts);
};

const deletePostFromDb = async (id) => {
  await Post.deleteOne({ _id: id });
};

const testPostInDb = async () => {
  const posts = await Post.find({});
  return posts.map((post) => post.toJSON());
};

module.exports = {
  initializeTestPosts,
  deletePostFromDb,
  testPosts,
  testPostInDb,
  testUser,
  validNonExistingUserId,
};
