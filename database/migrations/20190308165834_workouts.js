exports.up = function(knex, Promise) {
  return knex.schema.createTable("workouts", tbl => {
    // Unique workout id
    tbl.increments("workout_id");

    // Workout table columns
    tbl.string("workout_name", 128).notNullable();
    tbl.bigInteger("workout_date").unsigned();
    tbl.string("workout_type", 256);
    tbl.string("workout_subtype", 256);
    tbl.integer("workout_sets").unsigned();
    tbl.integer("workout_reps").unsigned();
    tbl.integer("workout_time").unsigned(); // Stored as minutes
    tbl.integer("workout_distance").unsigned(); // Stored as feet
    tbl.string("workout_notes", 256);
    tbl.string("body_region", 128);
    tbl.integer("current_weight").unsigned(); // Stored as lbs
    tbl.integer("max_weight").unsigned(); // Stored as lbs
    tbl.string("progress_picture", 1000);

    // Foreign key links to specific user
    tbl
      .integer("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();

    // Tracks account creation/update
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("workouts");
};
