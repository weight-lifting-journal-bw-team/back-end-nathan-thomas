const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  // remove,
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

// async function remove(id) {
//   const journal = await db("journals")
//     .where({ id })
//     .del();
// }
