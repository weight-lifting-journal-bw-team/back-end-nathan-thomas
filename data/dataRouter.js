const express = require("express");
const Data = require("./dataModel.js");

const router = express.Router();

// Get request to return the amount of journals for each day of the week by user.id
router.get("/amount-journals/:id", async (req, res) => {
  try {
    const journals = await Data.findJournals(req.params.id);
    if (journals) {
      res.status(200).json({
        error: false,
        message: "The array of journal chart data was retrieved successfully.",
        journals
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The array of journal chart data could not be found.",
        journals: [0, 0, 0, 0, 0, 0, 0]
      });
    }
  } catch {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request.",
      journals: [0, 0, 0, 0, 0, 0, 0]
    });
  }
});

module.exports = router;
