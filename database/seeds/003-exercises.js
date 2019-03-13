exports.seed = function(knex, Promise) {
  return knex("exercises")
    .del()
    .then(function() {
      return knex("exercises").insert([
        {
          userId: 1,
          journalId: 1,
          name: "Squats",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 2,
          journalId: 3,
          name: "Overhead Press",
          sets: 5,
          reps: 10,
          weight: 100
        },
        {
          userId: 1,
          journalId: 1,
          name: "Bench",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 1,
          journalId: 2,
          name: "Squats",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 2,
          journalId: 3,
          name: "Bent row",
          sets: 2,
          reps: 8,
          weight: 80
        },
        {
          userId: 1,
          journalId: 2,
          name: "Curls",
          sets: 5,
          reps: 10,
          weight: 70
        }
      ]);
    });
};
