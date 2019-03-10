const express = require("express");
const Users = require("./usersModel.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Get all users request
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    if (users) {
      res.status(200).json({
        message: "The users were found in the database",
        users
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The users could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Get users by id request
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select(
      "user_id",
      "username",
      "first_name",
      "last_name",
      "email",
      "created_at",
      "updated_at"
    );
    if (user) {
      res.status(200).json({
        message: "The user was retrieved successfully.",
        user
      });
    } else {
      res
        .status(404)
        .json({ message: "The user could not be found in the database." });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Update individual user request
router.put("/:id", async (req, res) => {
  const { username, password, first_name, last_name, email } = req.body;
  if (!username || !password || !first_name || !last_name || !email) {
    res.status(404).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
  try {
    const updateUser = req.body;
    const hash = bcrypt.hashSync(updateUser.password, 14);
    updateUser.password = hash;
    const user = await Users.update(req.params.id, updateUser);
    console.log(user);
    if (user) {
      const users = await Users.find().where({
        username: username
      });
      res.status(200).json({
        message: "The user was updated successfully.",
        numUpdate: user,
        users
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The user could not be updated in the databse."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

// Delete indiviudal user request
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        message: "User was deleted successfully.",
        numDeleted: deletedUser
      });
    } else {
      res
        .status(404)
        .json({ message: "The user could not be deleted in the database." });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was an error processing your request."
    });
  }
});

module.exports = router;
