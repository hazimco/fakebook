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
    test("fails with status 400 when password is missing", () => {});
    test("fails with status 400 when password is too short", () => {});
    test("fails with status 400 when user is missing", () => {});
    test("fails with status 400 when username is already taken", () => {});
    test("succeeds with 201 when data is valid", () => {});
  });
});

afterAll(() => {
  mongoose.connection.close();
});
