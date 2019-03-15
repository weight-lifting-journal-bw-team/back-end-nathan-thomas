const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("usersRouter.test.js", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  it("should run tests", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
