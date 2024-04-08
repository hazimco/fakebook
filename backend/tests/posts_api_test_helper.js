const Post = require("../models/post");
const User = require("../models/user");

const testUser = new User({
  username: "testUser1",
});

const testPosts = [
  { text: "first test post", user: testUser },
  { text: "second test post", user: testUser },
];

const initializeTestPosts = async () => {
  await Post.deleteMany({});
  await Post.insertMany(testPosts);
};

module.exports = {
  initializeTestPosts,
  testPosts,
};
