const express = require("express");
const Workouts = require("./workoutsModel.js");

const router = express();

// Get all workouts API request
router.get("/", async (req, res) => {
  try {
    const workouts = await Workouts.find();
    if (workouts) {
      res.status(200).json({
        message: "The workouts were retrieved successfully.",
        workouts
      });
    } else {
      res.status(404).json({
        error: true,
        message: "No workouts could be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Get single workout by its id request
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
      message: "There was an error processing your request."
    });
  }
});

// Get all workouts for single user request
router.get("/user/:id", async (req, res) => {
  try {
    const workouts = await Workouts.findAllByUserId(req.params.id);
    if (workouts.length) {
      res.status(200).json({
        message: "The workout(s) for that user were found in the database.",
        workouts
      });
    } else {
      res.status(404).json({
        error: true,
        message: "No workouts for that user were found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Create new workout for a user request
router.post("/", async (req, res) => {
  if (!req.body || !req.body.workout_name || !req.body.user_id) {
    res.status(406).json({
      error: true,
      message: "Please include workout details and try again."
    });
  } else {
    try {
      const workout = await Workouts.insert(req.body);
      if (workout) {
        res.status(200).json({
          message: "The workout was created successfully in the database.",
          workout
        });
      } else {
        res.status(404).json({
          error: true,
          message: "The workout could not be created at this time."
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "There was an error processing your request."
      });
    }
  }
});

// Update workout request
router.put("/:id", async (req, res) => {
  if (!req.body || !req.body.workout_name || !req.body.user_id) {
    res.status(406).json({
      error: true,
      message: "Please include workout details and try again."
    });
  }
  try {
    const updatedWorkout = await Workouts.update(req.params.id, req.body);
    if (updatedWorkout) {
      res.status(200).json({
        message: "The workout was updated successfully in the database.",
        workout: updatedWorkout
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The workout could not be found to be updated."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Delete workout request
router.delete("/:id", async (req, res) => {
  try {
    const removedWorkout = await Workouts.remove(req.params.id);
    console.log(removedWorkout);
    if (removedWorkout) {
      res.status(200).json({
        message: "The workout was deleted successfully.",
        numDeleted: removedWorkout
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The workout could not be found to be deleted."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

module.exports = router;
