const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findWithoutPassword,
  insert,
  remove,
  update
};

function find() {
  return db("users").select(
    "id",
    "username",
    "password",
    "firstName",
    "lastName",
    "email",
    "created_at",
    "updated_at"
  );
}

function findWithoutPassword() {
  return db("users").select(
    "id",
    "username",
    "firstName",
    "lastName",
    "email",
    "created_at",
    "updated_at"
  );
}

function findById(id) {
  return db("users")
    .where({ id })
    .select(
      "id",
      "username",
      "firstName",
      "lastName",
      "email",
      "created_at",
      "updated_at"
    )
    .first();
}

function insert(creds) {
  return (user = db("users")
    .insert(creds)
    .then(ids => 1));
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
