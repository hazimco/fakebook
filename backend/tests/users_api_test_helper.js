const bcrypt = require("bcrypt");
const User = require("../models/user");

const testUsers = [{ username: "testUser1" }, { username: "testUser2" }];

const initializeTestUsers = async () => {
  await User.deleteMany({});
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("123", saltRounds);
  const testUsersWithPasswordHash = testUsers.map((user) => {
    return { ...user, passwordHash };
  });
  await User.insertMany(testUsersWithPasswordHash);
};

const testUsersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const deleteUserFromDb = async (id) => {
  await User.deleteOne({ _id: id });
};

module.exports = {
  initializeTestUsers,
  deleteUserFromDb,
  testUsers,
  testUsersInDb,
};
