const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByNewJournal,
  findAllJournalsAndExercises,
  insert,
  remove,
  update
};

function find() {
  return db("journals");
}

function findById(id) {
  return db("journals")
    .where({ id })
    .first();
}

function findByNewJournal(details) {
  return db("journals").where({
    date: details.date,
    region: details.region
  });
}

async function findAllJournalsAndExercises(userId) {
  const exercises = await db("exercises").where({ userId });
  return (journals = await db("journals")
    .where({ userId })
    .map(journal => {
      const journalExercises = exercises.filter(
        exercise => exercise.journalId === journal.id
      );
      return { ...journal, exercises: journalExercises };
    }));
}

function insert(journal) {
  return db("journals")
    .insert(journal)
    .then(ids => 1);
}

function update(id, changes) {
  return db("journals")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  const exercises = await db("exercises")
    .where({ journalId: id })
    .delete();
  const journal = await db("journals")
    .where({ id })
    .first()
    .del();
  return journal;
}
