const express = require("express");
const Workouts = require("./workoutsModel.js");

// Cloudinary and multer imports
const { multerUploads, dataUri } = require("../common/multerMiddleware.js");
const { uploader, cloudinaryConfig } = require("../config/cloudinary.js");

const router = express();

// Pass through cloudinary middleware
cloudinaryConfig(router);

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
      message: "There was a problem with your request."
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
        workout: {},
        message: "Your workout could not be found."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      workouts: {},
      message: "There was a problem with your request."
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
      message: "There was a problem with your request."
    });
  }
});

// Create new workout for a user request
router.post("/", multerUploads, async (req, res) => {
  // JSON.parse() and destructure req.body
  const parsedWorkout = JSON.parse(req.body.workout);

  if (!parsedWorkout.workout_name || !parsedWorkout.user_id) {
    return res.status(406).json({
      error: true,
      workout: [],
      message:
        "Please include required workout name and user ID details and try again."
    });
  }

  // Strip image file from request and send to cloudinary for returned URL or null if failed
  const file = dataUri(req).content;
  let imgUrl = null;
  if (file) {
    const result = await uploader.upload(file);
    imgUrl = result.url;
  }

  // Conditionaly insertion of different image URLs based on workout submission
  const picture = imgUrl ? imgUrl : null;

  // Compile new user and insert into database
  const compiledWorkout = { ...parsedWorkout, progress_picture: picture };

  try {
    const workout = await Workouts.insert(compiledWorkout);
    if (workout) {
      const newWorkout = await Workouts.find()
        .where({
          workout_name: parsedWorkout.workout_name,
          workout_date: parsedWorkout.workout_date,
          user_id: parsedWorkout.user_id
        })
        .first();
      if (newWorkout) {
        res.status(200).json({
          error: false,
          message: "Your workout was created successfully.",
          workout: newWorkout
        });
      } else {
        res.status(400).json({
          error: true,
          workout: [],
          message: "Your workout was created but could not be returned."
        });
      }
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
      message: "There was a problem with your request."
    });
  }
});

// Update workout request
router.put("/:id", multerUploads, async (req, res) => {
  // JSON.parse() and destructure req.body
  const parsedWorkout = JSON.parse(req.body.workout);
  console.log(parsedWorkout);

  if (!parsedWorkout || !parsedWorkout.workout_name || !parsedWorkout.user_id) {
    return res.status(406).json({
      error: true,
      workout: [],
      message:
        "Please include required workout name and user ID details and try again.",
      numUpdated: 0
    });
  }

  // Strip image file from request and send to cloudinary for returned URL or null if failed
  const file = dataUri(req).content;
  let imgUrl = null;
  if (file) {
    const result = await uploader.upload(file);
    imgUrl = result.url;
  }

  // Conditionaly insertion of different image URLs based on workout submission
  const picture = imgUrl ? imgUrl : null;

  // Compile new user and insert into database
  const compiledWorkout = { ...parsedWorkout, progress_picture: picture };

  try {
    const updatedWorkout = await Workouts.update(
      req.params.id,
      compiledWorkout
    );
    if (updatedWorkout) {
      const updatedWorkout = await Workouts.findByWorkoutId(req.params.id);
      if (updatedWorkout) {
        res.status(200).json({
          error: false,
          message: "Your workout was updated successfully.",
          workout: updatedWorkout,
          numUpdated: 1
        });
      } else {
        res.status(400).json({
          error: true,
          workout: [],
          message: "Your workout was updated but could not be returned.",
          numUpdated: 1
        });
      }
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
      message: "There was a problem with your request.",
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
      message: "There was a problem with your request.",
      numDeleted: 0
    });
  }
});

module.exports = router;
