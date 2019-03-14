exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("journals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("journals").insert([
        { userId: 1, date: Date.now().toString(), region: "Legs" },
        { userId: 1, date: (Date.now() + 100).toString(), region: "Back" },
        { userId: 2, date: (Date.now() + 1000).toString(), region: "Core" },
        { userId: 2, date: (Date.now() + 2000).toString(), region: "Abs" }
      ]);
    });
};
