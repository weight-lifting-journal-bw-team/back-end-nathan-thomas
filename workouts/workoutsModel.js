const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findAllByUserId,
  findByWorkoutId,
  insert,
  remove,
  update
};

function find() {
  return db("workouts");
}

function findAllByUserId(userId) {
  return db("workouts").where({ user_id: userId });
}

function findByWorkoutId(id) {
  return db("workouts")
    .where({ workout_id: id })
    .first();
}

function insert(workout) {
  return db("workouts")
    .insert(workout)
    .then(ids => ids);
}

function update(id, changes) {
  return db("workouts")
    .where({ workout_id: id })
    .update(changes);
}

function remove(id) {
  return db("workouts")
    .where({ workout_id: id })
    .del();
}
