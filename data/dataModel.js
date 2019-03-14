const db = require("../database/dbConfig.js");
const moment = require("moment");

module.exports = {
  findJournals
};

function findJournals(id) {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const week = [...Array(7)].map(space => 0);
  const journals = db("journals").where({ userId: id });
  const journalDates = journals.map(journal => Number(journal.date));

  const currentDate = moment().format("ddd");

  const date = new Date();
  return date.setDate(date.getDate()).getDate();
}

/*

1. Get current date and compare to

*/
