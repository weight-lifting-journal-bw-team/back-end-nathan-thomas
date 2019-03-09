const bcrypt = require("bcryptjs"); // Import for encryption

exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password", 14),
          first_name: "admin",
          last_name: "admin",
          email: "email@gmail.com",
          address: "123 Street Avenue",
          city: "San Francisco",
          state: "California",
          zip_code: 12345
        }
      ]);
    });
};
