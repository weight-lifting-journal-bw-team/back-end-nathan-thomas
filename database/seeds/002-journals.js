exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("journals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("journals").insert([
        {
          userId: 1,
          date: (Date.now() - 100000000).toString(),
          region: "Legs"
        },
        {
          userId: 1,
          date: (Date.now() - 200000000).toString(),
          region: "Back"
        },
        {
          userId: 2,
          date: (Date.now() - 300000000).toString(),
          region: "Core"
        },
        { userId: 2, date: (Date.now() - 400000000).toString(), region: "Abs" },
        {
          userId: 1,
          date: (Date.now() - 400000000).toString(),
          region: "Abs"
        },
        {
          userId: 1,
          date: (Date.now() - 350000000).toString(),
          region: "Chest"
        },
        {
          userId: 1,
          date: (Date.now() - 400000000).toString(),
          region: "Arms"
        },
        {
          userId: 1,
          date: (Date.now() - 450000000).toString(),
          region: "Calves"
        },
        {
          userId: 1,
          date: (Date.now() - 460000000).toString(),
          region: "Glutes"
        },
        {
          userId: 1,
          date: (Date.now() - 500000000).toString(),
          region: "Chest"
        },
        {
          userId: 1,
          date: (Date.now() - 500000000).toString(),
          region: "Legs"
        },
        {
          userId: 1,
          date: (Date.now() - 600000000).toString(),
          region: "Arms"
        },
        {
          userId: 1,
          date: (Date.now() - 650000000).toString(),
          region: "Core"
        },
        {
          userId: 1,
          date: (Date.now() - 660000000).toString(),
          region: "Back"
        }
      ]);
    });
};
