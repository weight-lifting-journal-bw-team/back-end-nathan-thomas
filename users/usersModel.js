const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  remove,
  update
};

function find() {
  return db("users").select(
    "user_id",
    "username",
    "first_name",
    "last_name",
    "email",
    "created_at",
    "updated_at"
  );
}

function findById(id) {
  return db("users")
    .where({ user_id: id })
    .select(
      "user_id",
      "username",
      "first_name",
      "last_name",
      "email",
      "created_at",
      "updated_at"
    )
    .first();
}

function insert(creds) {
  return db("users")
    .insert(creds)
    .then(ids => ids);
}

// Made async to accomodate returning updated user
function update(id, changes) {
  return db("users")
    .where({ user_id: id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ user_id: id })
    .del();
}
