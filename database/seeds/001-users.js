const bcrypt = require("bcryptjs"); // Import for encryption
// Data modeling here: https://www.dbdesigner.net/designer/schema/233119

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password", 14),
          firstName: "admin",
          lastName: "istrator",
          email: "email@gmail.com"
        },
        {
          username: "mcfly",
          password: bcrypt.hashSync("password", 14),
          firstName: "Marty",
          lastName: "McFly",
          email: "thelibyans@gmail.com"
        },
        {
          username: "bigdoc",
          password: bcrypt.hashSync("password", 14),
          firstName: "Doc",
          lastName: "Brown",
          email: "greatscott@gmail.com"
        },
        {
          username: "nwthomas",
          password: bcrypt.hashSync("password", 14),
          firstName: "Nathan",
          lastName: "Thomas",
          email: "thedude@gmail.com"
        }
      ]);
    });
};
