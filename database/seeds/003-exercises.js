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
          name: "Deadlift",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 1,
          journalId: 1,
          name: "Lunges",
          sets: 10,
          reps: 20,
          weight: 100
        },
        {
          userId: 1,
          journalId: 2,
          name: "Squats",
          sets: 5,
          reps: 10,
          weight: 210
        },
        {
          userId: 1,
          journalId: 2,
          name: "Lat Pulldown",
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
        },
        {
          userId: 1,
          journalId: 5,
          name: "Cruches",
          sets: 5,
          reps: 20,
          weight: 100
        },
        {
          userId: 1,
          journalId: 6,
          name: "Bench Press",
          sets: 10,
          reps: 5,
          weight: 205
        },
        {
          userId: 1,
          journalId: 7,
          name: "Triceps Extension",
          sets: 3,
          reps: 10,
          weight: 125
        },
        {
          userId: 1,
          journalId: 7,
          name: "Curls",
          sets: 3,
          reps: 10,
          weight: 125
        },
        {
          userId: 1,
          journalId: 8,
          name: "Squats",
          sets: 3,
          reps: 10,
          weight: 125
        },
        {
          userId: 1,
          journalId: 8,
          name: "",
          sets: 3,
          reps: 10,
          weight: 125
        },
        {
          userId: 1,
          journalId: 9,
          name: "Calf Raise",
          sets: 5,
          reps: 8,
          weight: 305
        },
        {
          userId: 1,
          journalId: 10,
          name: "Bench Press",
          sets: 5,
          reps: 8,
          weight: 305
        },
        {
          userId: 1,
          journalId: 11,
          name: "Leg Extensions",
          sets: 8,
          reps: 5,
          weight: 150
        },
        {
          userId: 1,
          journalId: 12,
          name: "Deadlifts",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 1,
          journalId: 13,
          name: "Bench Press",
          sets: 5,
          reps: 8,
          weight: 305
        },
        {
          userId: 1,
          journalId: 14,
          name: "Leg Extensions",
          sets: 8,
          reps: 5,
          weight: 150
        },
        {
          userId: 1,
          journalId: 12,
          name: "Deadlifts",
          sets: 5,
          reps: 10,
          weight: 200
        },
        {
          userId: 2,
          journalId: 14,
          name: "Bent row",
          sets: 5,
          reps: 8,
          weight: 120
        }
      ]);
    });
};
