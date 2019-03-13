exports.up = function(knex, Promise) {
  return knex.schema.createTable("journals", tbl => {
    // Unique workout id
    tbl.increments();

    // Workout table columns
    tbl.string("date").notNullable();
    tbl.string("bodyRegion", 128);

    // Foreign key links to specific user
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();

    // Tracks account creation/update
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("journals");
};
