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

module.exports = {
  initializeTestUsers,
  testUsers,
};
