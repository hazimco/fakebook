const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const api = request(app);
const jwt = require("jsonwebtoken");

const API_PATH = "/api/posts";
const helper = require("./posts_api_test_helper");

beforeAll(async () => {
  await helper.initializeTestPosts();
});

describe("Endpoint /api/posts", () => {
  describe("GET - Getting posts", () => {
    test("returns correct number of posts", async () => {
      const response = await api
        .get(API_PATH)
        .expect(200)
        .expect("Content-type", /application\/json/);

      expect(response.body).toHaveLength(helper.testPosts.length);
    });

    test("returns posts with defined properties 'id', 'text', 'createdAt', 'user'", async () => {
      const response = await api
        .get(API_PATH)
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
        .get(API_PATH)
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
      const userForToken = {
        id: helper.testUser._id,
        username: helper.testUser.username,
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: "10s",
      });

      test("succeeds with status 201 when data is valid", async () => {
        const newPost = { text: "test post that should successfully be added" };

        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send(newPost)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        newPost.id = response.body.id;
        newPost.createdAt = response.body.createdAt;
        newPost.user = userForToken.id.toString();

        expect(response.body).toStrictEqual(newPost);

        //remove added post to not mess up tests that come later
        await helper.deletePostFromDb(newPost.id);
      });

      test("fails with status 400 when text is empty", async () => {
        const newPostWithEmptyText = { text: "" };

        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send(newPostWithEmptyText)
          .expect(400)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBeDefined;

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });

      test("fails with status 400 when text is too long", async () => {
        const newPostWithTextTooLong = {
          text: "This text is too long. How long is too long, you ask? Well currently, it's defined in models/post.js as maxLength 140 characters. That is it.", //141 characters in this text
        };

        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send(newPostWithTextTooLong)
          .expect(400)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBeDefined();

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });

      test("fails with status 404 when user is not found", async () => {
        const userForToken = {
          id: helper.validNonExistingUserId,
          username: "nonExistingUser",
        };
        const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
          expiresIn: "10s",
        });

        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send({
            text: "test post that should fail to be added",
            user: helper.testUser._id,
          })
          .expect(404)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBe("user not found");

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });
    });

    describe("fails with status 401", () => {
      test("when token is expired", async () => {
        const userForToken = {
          id: helper.testUser._id,
          username: helper.testUser.username,
        };
        const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
          expiresIn: "0s",
        });
        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send(helper.testPosts[0])
          .expect(401)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBe("jwt expired");

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });

      test("when token is invalid", async () => {
        const userForTokenWithoutId = {
          username: helper.testUser.username,
        };
        const token = jwt.sign(userForTokenWithoutId, process.env.JWT_SECRET, {
          expiresIn: "5s",
        });
        const response = await api
          .post(API_PATH)
          .set("Authorization", `Bearer ${token}`)
          .send(helper.testPosts[0])
          .expect(401)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBe("invalid token");

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });

      test("when token is malformed", async () => {
        const response = await api
          .post(API_PATH)
          .set("Authorization", "Bearer malformed-token")
          .send(helper.testPosts[0])
          .expect(401)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBe("jwt malformed");

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });

      test("when token is not provided in authorization header", async () => {
        const response = await api
          .post(API_PATH)
          .send(helper.testPosts[0])
          .expect(401)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toBe("jwt must be provided");

        const postsInDb = await helper.testPostsInDb();
        expect(postsInDb).toHaveLength(helper.testPosts.length);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
