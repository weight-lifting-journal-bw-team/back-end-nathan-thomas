const db = require("../database/dbConfig.js");
const moment = require("moment");

module.exports = {
  findJournals
};

// Create array of weekdays
//

async function findJournals(id) {
  const week = { Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thur: 0, Fri: 0, Sat: 0 };

  const journals = await db("journals").where({ userId: id });
  const currentDayText = Number(Date(Date.now())).getDay();
  const journalDates = journals.map(journal =>
    new Date(Number(journal.date)).getDay()
  );

  return currentDayText;
}

function makeWeek() {
  const week = [...Array(7)].map;
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return currentDayText;
}

// const currentDate = moment().format("ddd");
//   const date = Date.now();
//   const year = new Date(date).getFullYear();
//   const month = new Date(date).getMonth();

//   return journalDates;
