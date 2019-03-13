// Data modeling here: https://www.dbdesigner.net/designer/schema/233119

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    // Unique user id
    tbl.increments("user_id");

    // User profile
    tbl.string("username", 256).notNullable();
    tbl.string("password", 256).notNullable();
    tbl.string("first_name", 256).notNullable();
    tbl.string("last_name", 256).notNullable();
    tbl.string("email", 256).notNullable();
    tbl.string("profile_picture", 1000);

    // Tracks account creation/update
    tbl.timestamps(true, true);

    // Sets unique username to user
    tbl.unique("username", "uq_user_username");

    // Sets unique email to user
    tbl.unique("email", "uq_user_email");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};