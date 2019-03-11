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
          first_name: "admin",
          last_name: "istrator",
          email: "email@gmail.com",
          profile_picture: null
        },
        {
          username: "mcfly",
          password: bcrypt.hashSync("password", 14),
          first_name: "Marty",
          last_name: "McFly",
          email: "thelibyans@gmail.com",
          profile_picture: null
        },
        {
          username: "bigdoc",
          password: bcrypt.hashSync("password", 14),
          first_name: "Doc",
          last_name: "Brown",
          email: "greatscott@gmail.com",
          profile_picture: null
        },
        {
          username: "nwthomas",
          password: bcrypt.hashSync("password", 14),
          first_name: "Nathan",
          last_name: "Thomas",
          email: "thedude@gmail.com",
          profile_picture: null
        }
      ]);
    });
};
