exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("journals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("journals").insert([
        { userId: 1, date: "Jan 19, 2019", region: "Legs" },
        { userId: 1, date: "Jan 20, 2019", region: "Back" },
        { userId: 2, date: "Dec 1, 2018", region: "Core" }
      ]);
    });
};
