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
        error: false,
        message: "The users were found in the database",
        users
      });
    } else {
      res.status(404).json({
        error: true,
        users: [],
        message: "The users could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      users: [],
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
        error: false,
        message: "Your profile was retrieved successfully.",
        user
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be found in the database.",
        user: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
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
      user: {},
      message: "There was an error processing your request.",
      numUpdated: 0
    });
  }
  try {
    const hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    const updatedUser = await Users.update(req.params.id, req.body);
    if (updatedUser) {
      const user = await Users.find()
        .where({
          username: username
        })
        .first();
      res.status(200).json({
        error: false,
        message: "Your profile was updated successfully.",
        numUpdated: updatedUser,
        user: {
          user_id: user.user_id,
          username,
          first_name,
          last_name,
          email,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      });
    } else {
      res.status(404).json({
        error: true,
        user: {},
        message: "Your profile could not be updated.",
        numUpdated: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
      message: "There was an error processing your request.",
      numUpdated: 0
    });
  }
});

// Delete indiviudal user request
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        error: false,
        message: "Your profile was deleted successfully.",
        numDeleted: deletedUser
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be deleted.",
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
