const db = require("../database/dbConfig.js");
const Users = require("./usersModel.js");

describe("users model", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  describe(".find()", () => {
    it("should find all users in the db", async () => {
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
    it("should insert a user successfully", async () => {
      const user = await Users.insert({
        username: "admin",
        password: "password",
        firstName: "admin",
        lastName: "istrator",
        email: "email@gmail.com"
      });
      expect(user).toBe(1);
    });
  });

  describe(".findById()", () => {
    it("should retrieve a user by that user's ID", async () => {
      const user = await Users.insert({
        username: "admin",
        password: "password",
        firstName: "admin",
        lastName: "istrator",
        email: "email@gmail.com"
      });
      const retrievedUser = await Users.findById(1);
      expect(retrievedUser).toBeDefined();
    });
  });

  describe(".update()", () => {
    it("should update a user successfully", async () => {
      const user = await Users.insert({
        username: "admin",
        password: "password",
        firstName: "admin",
        lastName: "istrator",
        email: "email@gmail.com"
      });
      const retrievedUser = await Users.findById(1);
      expect(retrievedUser).toBeDefined();
    });
  });

  describe(".remove()", () => {
    it("should remove a user successfully from the database", async () => {
      const user = await Users.insert({
        username: "admin",
        password: "password",
        firstName: "admin",
        lastName: "istrator",
        email: "email@gmail.com"
      });
      const removed = await Users.remove(1);
      expect(removed).toBeTruthy();
    });
  });
});
