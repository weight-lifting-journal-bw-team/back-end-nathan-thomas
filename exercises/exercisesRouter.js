const express = require("express");
const Exercises = require("./exercisesModel.js");

const router = express();

// Get all exercises API request
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercises.find();
    if (exercises.length) {
      res.status(200).json({
        error: false,
        message: "The exercises were retrieved successfully.",
        exercises
      });
    } else {
      res.status(404).json({
        error: true,
        workouts: [],
        message: "The exercises could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was a problem with your request."
    });
  }
});

// Get single exercise by its id request
router.get("/journal/:id", async (req, res) => {
  try {
    const exercises = await Exercises.findByJournalId(req.params.id);
    if (exercises.length) {
      res.status(200).json({
        error: false,
        message: "Your exercises were retrieved successfully.",
        exercises
      });
    } else {
      res.status(404).json({
        error: true,
        workout: [],
        message: "Your exercises could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      workouts: [],
      message: "There was a problem with your request."
    });
  }
});

// Get all exercise for single user request
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercises.findByExerciseId(req.params.id);
    if (exercise) {
      res.status(200).json({
        error: false,
        message: "Your exercise was retrieved successfully.",
        exercise
      });
    } else {
      res.status(404).json({
        error: true,
        exercise: {},
        message: "Your excise could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      exercise: {},
      message: "There was a problem with your request."
    });
  }
});

// Create new workout for a user request
router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(406).json({
      error: true,
      exercise: {},
      message: "Please include required data and try again."
    });
  }

  try {
    const exercise = await Exercises.insert(req.body);
    if (exercise) {
      const newExercise = await Exercises.find()
        .where({
          ...req.body
        })
        .first();
      if (newExercise) {
        res.status(200).json({
          error: false,
          message: "Your exercise was created successfully.",
          exercise: newExercise
        });
      } else {
        res.status(400).json({
          error: true,
          exercise: {},
          message: "Your exercise was created but could not be returned."
        });
      }
    } else {
      res.status(404).json({
        error: true,
        exercise: {},
        message: "Your exercise could not be created."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      exercise: {},
      message: "There was a problem with your request."
    });
  }
});

// Update workout request
router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(406).json({
      error: true,
      exercise: {},
      message: "Please include required exercise details and try again."
    });
  }

  try {
    const updatedExercise = await Exercises.update(req.params.id, req.body);
    if (updatedExercise) {
      const exercise = await Exercises.findByExerciseId(req.params.id);
      if (exercise) {
        res.status(200).json({
          error: false,
          message: "Your exercise was updated successfully.",
          exercise
        });
      } else {
        res.status(400).json({
          error: true,
          exercise: {},
          message: "Your exercise was updated but could not be returned."
        });
      }
    } else {
      res.status(404).json({
        error: true,
        exercise: {},
        message: "Your exercise could not be found to be updated."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      exercise: {},
      message: "There was a problem with your request."
    });
  }
});

// Delete workout request
router.delete("/:id", async (req, res) => {
  try {
    const removedExercise = await Exercises.remove(req.params.id);
    if (removedExercise) {
      res.status(200).json({
        error: false,
        message: "Your exercise was deleted successfully.",
        numDeleted: removedExercise
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your exercise could not be found to be deleted.",
        numDeleted: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was a problem with your request.",
      numDeleted: 0
    });
  }
});

module.exports = router;
