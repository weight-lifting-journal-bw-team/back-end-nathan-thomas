const db = require("../database/dbConfig.js");
const moment = require("moment");

module.exports = {
  findJournals
};

function findJournals(id) {
  const week = [...Array(7)].map(space => null);
  const journals = db("journals").where({ userId: id });
  const journalDates = journals.map(journal => Number(journal.date));

  const currentDate = moment().format("ddd");

  return journalDates;
}
