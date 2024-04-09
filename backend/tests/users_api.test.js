const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const api = request(app);

const API_PATH = "/api/users";
const helper = require("./users_api_test_helper");

beforeAll(async () => {
  await helper.initializeTestUsers();
});

describe("Endpoint /api/users", () => {
  describe("GET - Getting users", () => {
    test("returns correct number of users", async () => {
      const response = await api
        .get(API_PATH)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(helper.testUsers.length);
    });

    test("returns users with defined properties 'id', 'username', 'posts'", async () => {
      const response = await api
        .get(API_PATH)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      response.body.forEach((user) => {
        expect(user.id).toBeDefined();
        expect(user.username).toBeDefined();
        expect(user.posts).toBeDefined();
      });
    });

    test("returns users that do not contain properties '_id', '__v', 'passwordHash'", async () => {
      const response = await api
        .get(API_PATH)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      response.body.forEach((user) => {
        expect(user._id).not.toBeDefined();
        expect(user.__v).not.toBeDefined();
        expect(user.passwordHash).not.toBeDefined();
      });
    });
  });

  describe("POST - Adding a new user", () => {
    test("succeeds with 201 when data is valid", async () => {
      const newUser = {
        username: "newUser",
        password: "123",
      };

      const response = await api
        .post(API_PATH)
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      newUser.id = response.body.id;
      newUser.posts = [];
      delete newUser.password;

      expect(response.body).toStrictEqual(newUser);

      const usersInDb = await helper.testUsersInDb();
      expect(usersInDb).toHaveLength(helper.testUsers.length + 1);
      expect(usersInDb).toContainEqual(newUser);

      //remove added user to not mess up tests that come later
      await helper.deleteUserFromDb(newUser.id);
    });

    test("fails with status 400 when password is missing", async () => {
      const newUserWithNoPassword = {
        username: "newUser",
      };

      const response = await api
        .post(API_PATH)
        .send(newUserWithNoPassword)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toBe("password is required");

      const usersInDb = await helper.testUsersInDb();
      expect(usersInDb).toHaveLength(helper.testUsers.length);
    });

    test("fails with status 400 when password is too short", async () => {
      const newUserWithTooShortPassword = {
        username: "newUser",
        password: "1",
      };

      const response = await api
        .post(API_PATH)
        .send(newUserWithTooShortPassword)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toBe(
        "password must be at least 3 characters long"
      );

      const usersInDb = await helper.testUsersInDb();
      expect(usersInDb).toHaveLength(helper.testUsers.length);
    });

    test("fails with status 400 when username is missing", async () => {
      const newUserWithNoUsername = {
        password: "123",
      };

      const response = await api
        .post(API_PATH)
        .send(newUserWithNoUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toBeDefined();

      const usersInDb = await helper.testUsersInDb();
      expect(usersInDb).toHaveLength(helper.testUsers.length);
    });

    test("fails with status 400 when username is already taken", async () => {
      const newUserWithAlreadyTakenUsername = {
        username: helper.testUsers[0].username,
        password: "123",
      };

      const response = await api
        .post(API_PATH)
        .send(newUserWithAlreadyTakenUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toContain("unique");

      const usersInDb = await helper.testUsersInDb();
      expect(usersInDb).toHaveLength(helper.testUsers.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
