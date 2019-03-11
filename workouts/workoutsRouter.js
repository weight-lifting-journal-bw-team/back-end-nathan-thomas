const express = require("express");
const Workouts = require("./workoutsModel.js");

const router = express();

// Get all workouts API request
router.get("/", async (req, res) => {
  try {
    const workouts = await Workouts.find();
    if (workouts) {
      res.status(200).json({
        error: false,
        message: "The workouts were retrieved successfully.",
        workouts
      });
    } else {
      res.status(404).json({
        error: true,
        workouts: [],
        message: "The workouts could not be found."
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
      res.status(200).json({
        error: false,
        message: "Your workout was retrieved successfully.",
        workout
      });
    } else {
      res.status(404).json({
        error: true,
        workout: [],
        message: "Your workout could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      workouts: [],
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
        error: false,
        message: "All of your workouts were retrieved successfully.",
        workouts
      });
    } else {
      res.status(404).json({
        error: true,
        workouts: [],
        message: "Your workouts could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      workouts: [],
      message: "There was an error processing your request."
    });
  }
});

// Create new workout for a user request
router.post("/", async (req, res) => {
  if (!req.body.workout_name || !req.body.user_id) {
    res.status(406).json({
      error: true,
      workout: [],
      message: "Please include workout details and try again."
    });
  } else {
    try {
      const workout = await Workouts.insert(req.body);
      if (workout) {
        res.status(200).json({
          error: false,
          message: "Your workout was created successfully.",
          workout
        });
      } else {
        res.status(404).json({
          error: true,
          workout: [],
          message: "Your workout could not be created."
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        workout: [],
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
      workout: [],
      message: "Please include workout details and try again.",
      numUpdated: 0
    });
  }
  try {
    const updatedWorkout = await Workouts.update(req.params.id, req.body);
    if (updatedWorkout) {
      res.status(200).json({
        error: false,
        message: "Your workout was updated successfully.",
        workout: updatedWorkout,
        numUpdated: 1
      });
    } else {
      res.status(404).json({
        error: true,
        workout: [],
        message: "Your workout could not be found to be updated.",
        numUpdated: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      workout: [],
      message: "There was an error processing your request.",
      numUpdated: 0
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
        error: false,
        message: "Your workout was deleted successfully.",
        numDeleted: removedWorkout
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your workout could not be found to be deleted.",
        numDeleted: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request.",
      numDeleted: 0
    });
  }
});

module.exports = router;
