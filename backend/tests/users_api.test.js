describe("Endpoint /api/users", () => {
  describe("GET - Getting users", () => {
    test("returns correct numer of users", () => {});
    test("returns users with defined properties 'id', 'username', 'posts'", () => {});
    test("returns users that do not contain properties '_id', '__v', 'passwordHash'", () => {});
  });

  describe("POST - Adding a new user", () => {
    test("fails with status 400 when password is missing", () => {});
    test("fails with status 400 when password is too short", () => {});
    test("fails with status 400 when user is missing", () => {});
    test("fails with status 400 when username is already taken", () => {});
    test("succeeds with 201 when data is valid", () => {});
  });
});
