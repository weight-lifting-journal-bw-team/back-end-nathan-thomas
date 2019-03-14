const express = require("express");
const Data = require("./dataModel.js");

const router = express.Router();

// Get request to return the amount of journals for each day of the week
router.get("/amount-journals/:id", async (req, res) => {
  try {
    const journals = await Data.findJournals(req.params.id);
    if (journals) {
      res.status(200).json({
        error: false,
        message: "The array of workout chart data was retrieved successfully.",
        journals
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The array of workout chart data could not be found.",
        journals: [null, null, null, null, null, null, null]
      });
    }
  } catch {
    res.status(500).json({
      error: true,
      weight: [],
      message: "There was an error processing your request.",
      journals: [null, null, null, null, null, null, null]
    });
  }
});

module.exports = router;
