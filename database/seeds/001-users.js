const bcrypt = require("bcryptjs"); // Import for encryption
// Data modeling here: https://www.dbdesigner.net/designer/schema/233119

const faker = require("faker"); // Import for fake data

exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password", 14),
          first_name: "admin",
          last_name: "istrator",
          email: "email@gmail.com"
        }
      ]);
    });
};
