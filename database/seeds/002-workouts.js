exports.seed = function(knex, Promise) {
  return knex("workouts")
    .truncate()
    .then(function() {
      return knex("workouts").insert([
        { id: 1, colName: "rowValue1" },
        { id: 2, colName: "rowValue2" },
        { id: 3, colName: "rowValue3" }
      ]);
    });
};
