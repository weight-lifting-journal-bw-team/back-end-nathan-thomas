const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findByJournalId,
  findByExerciseId,
  insert,
  remove,
  update
};

function find() {
  return db("exercises");
}

function findByJournalId(journalId) {
  return db("exercises").where({ journalId });
}

function findByExerciseId(exerciseId) {
  return db("exercises").where({ id: exerciseId });
}

function insert(exercise) {
  console.log(exercise);
  return db("exercises")
    .insert(exercise)
    .then(ids => ids);
}

function update(id, changes) {
  return db("exercises")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("exercises")
    .where({ id })
    .del();
}
