const db = require("../database/dbConfig.js");
const Users = require("./usersModel.js");

describe("users model", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  describe(".find()", () => {
    it("should find all users in the db", () => {
      const user = await Users.insert({
        username: "admin",
        password: "password",
        firstName: "admin",
        lastName: "istrator",
        email: "email@gmail.com"
      });
      const users = await Users.find();
      expect(users.length).toBe(1);
    });
  });

  describe(".insert()", () => {
    const user = await Users.insert({
      username: "admin",
      password: "password",
      firstName: "admin",
      lastName: "istrator",
      email: "email@gmail.com"
    });
    expect(user).toBe(1);
  });
})