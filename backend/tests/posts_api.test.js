describe("Endpoint /api/posts", () => {
  describe("GET - Getting posts", () => {
    test("returns correct number of posts", () => {});
    test("returns posts with properties 'id', 'text', 'createdAt', 'user' of correct types", () => {});
    test("returns posts that do not contain properties '_id', '__v', 'passwordHash'", () => {});
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
