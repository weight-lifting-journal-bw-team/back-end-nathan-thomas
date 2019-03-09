const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  remove,
  update
};

function find() {
  return db("workouts");
}

function findById(id) {
  return db("workouts")
    .where({ id })
    .first();
}

function insert(workout) {
  return db("workouts")
    .insert(workout)
    .then(ids => ids);
}

function update(id, changes) {
  return db("workouts")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("workouts")
    .where({ id })
    .del();
}
