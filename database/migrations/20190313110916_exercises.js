exports.up = function(knex, Promise) {
  return knex.schema.createTable("exercises", tbl => {
    tbl.increments();

    tbl
      .integer("journalId")
      .unsigned()
      .references("id")
      .inTable("journals");

    tbl
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users");

    tbl.string("name", 128).notNullable();
    tbl.integer("reps").notNullable();
    tbl.integer("sets").notNullable();
    tbl.string("weight", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("exercises");
};
