exports.seed = function(knex, Promise) {
  return knex("workouts")
    .del()
    .then(function() {
      return knex("workouts").insert([
        {
          workout_name: "Hoverboarding",
          workout_date: Date.now(),
          workout_type: "Cardio",
          workout_subtype: "Skateboarding",
          workout_sets: null,
          workout_reps: null,
          workout_time: 60,
          workout_distance: 500,
          workout_notes:
            "Had to hoverboard away from some crazy futuristic bullies.",
          body_region: "Legs",
          max_weight: null,
          progress_picture: null,
          user_id: 2
        },
        {
          workout_name: "Time traveling like crazy",
          workout_date: Date.now(),
          workout_type: "Cardio",
          workout_subtype: "General Aerobics",
          workout_sets: null,
          workout_reps: null,
          workout_time: 34,
          workout_distance: 162,
          workout_notes: "Roads? Where we're going we don't need roads....",
          body_region: "Full Body",
          max_weight: null,
          progress_picture: null,
          user_id: 3
        },
        {
          workout_name: "Inventing a time machine",
          workout_date: Date.now(),
          workout_type: "Aerobics",
          workout_subtype: "General Aerobics",
          workout_sets: null,
          workout_reps: null,
          workout_time: 1,
          workout_distance: 18906,
          workout_notes:
            "I know you just sent me back to the future, but I'm back. I'm back from the future.",
          body_region: "Full Body",
          max_weight: null,
          progress_picture: null,
          user_id: 3
        },
        {
          workout_name: "Avoiding the Libyans",
          workout_date: Date.now(),
          workout_type: "Cardio",
          workout_subtype: "Running",
          workout_sets: null,
          workout_reps: null,
          workout_time: 10,
          workout_distance: 38,
          workout_notes:
            "Oh my God. They found me. I don't know how, but they found me. Run for it, Marty!!",
          body_region: "Full Body",
          max_weight: null,
          progress_picture: null,
          user_id: 3
        },
        {
          workout_name: "Helping Doc Brown out",
          workout_date: Date.now(),
          workout_type: "Strength",
          workout_subtype: "Squats",
          workout_sets: 5,
          workout_reps: 5,
          workout_time: 51,
          workout_distance: null,
          workout_notes:
            "Wait a minute. Wait a minute Doc, uh, are you telling me you built a time machine … out of a DeLorean?",
          body_region: "Legs",
          max_weight: 215,
          progress_picture: null,
          user_id: 2
        }
      ]);
    });
};
