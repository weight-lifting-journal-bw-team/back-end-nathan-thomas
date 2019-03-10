const bcrypt = require("bcryptjs"); // Import for encryption
// Data modeling here: https://www.dbdesigner.net/designer/schema/233119

const faker = require("faker"); // Import for fake data

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password", 14),
          first_name: "admin",
          last_name: "istrator",
          email: "email@gmail.com"
        },
        {
          username: "wehavetogoback",
          password: bcrypt.hashSync("password", 14),
          first_name: "Marty",
          last_name: "McFly",
          email: "theLibyans@gmail.com"
        },
        {
          username: "big_doc",
          password: bcrypt.hashSync("password", 14),
          first_name: "Doc",
          last_name: "Brown",
          email: "greatscott@gmail.com"
        }
      ]);
    });
};
