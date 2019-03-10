const express = require("express");
const Workouts = require("./workoutsModel.js");

const router = express();

router.get("/:id", async (req, res) => {
  try {
    const workout = await Workouts.findByWorkoutId(req.params.id);
    if (workout) {
      res
        .status(200)
        .json({ message: "The workout was retrieved successfully.", workout });
    } else {
      res.status(404).json({
        error: true,
        message: "The workout could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error retrieving the workout from the database"
    });
  }
});

router.get("/user:id", async (req, res) => {
  try {
    // Build out request
  } catch (error) {
    // Build out request
  }
});

router.post("/:id", async (req, res) => {
  try {
    // Build out request
  } catch (error) {
    // Build out request
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Build out request
  } catch (error) {
    // Build out request
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Build out request
  } catch (error) {
    // Build out request
  }
});

module.exports = router;
