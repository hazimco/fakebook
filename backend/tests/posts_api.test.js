const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const api = request(app);

const helper = require("./posts_api_test_helper");

beforeAll(async () => {
  await helper.initializeTestPosts();
});

describe("Endpoint /api/posts", () => {
  describe("GET - Getting posts", () => {
    test("returns correct number of posts", async () => {
      const response = await api
        .get("/api/posts")
        .expect(200)
        .expect("Content-type", /application\/json/);

      expect(response.body).toHaveLength(helper.testPosts.length);
    });

    test("returns posts with defined properties 'id', 'text', 'createdAt', 'user'", async () => {
      const response = await api
        .get("/api/posts")
        .expect(200)
        .expect("Content-type", /application\/json/);

      response.body.forEach((post) => {
        expect(post.id).toBeDefined();
        expect(post.text).toBeDefined();
        expect(post.createdAt).toBeDefined();
        expect(post.user).toBeDefined();
      });
    });

    test("returns posts that do not contain properties '_id', '__v', 'passwordHash'", async () => {
      const response = await api
        .get("/api/posts")
        .expect(200)
        .expect("Content-type", /application\/json/);

      response.body.forEach((post) => {
        expect(post._id).not.toBeDefined();
        expect(post.__v).not.toBeDefined();
        expect(post.passwordHash).not.toBeDefined();
      });
    });
  });

  describe("POST - Adding a new post", () => {
    describe("with valid token", () => {
      test("succeeds with status 201 when data is valid", () => {});
      test("fails with status 400 when data is invalid", () => {});
      test("fails with status 404 when user is not found", () => {});
    });

    describe("fails with status 401", () => {
      test("when token is expired", () => {});
      test("when token is invalid", () => {});
      test("when token is missing in authorization header", () => {});
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
