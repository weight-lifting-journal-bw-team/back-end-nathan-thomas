// Import Express
const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");
const tokenService = require("../auth/tokenService.js");
const authConstraints = require("./authConstraints.js");

// Creates router for specific API route
const router = express.Router();

// New user registration request
router.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    // Encryption of password
    const hash = bcrypt.hashSync(newUser.password, 14); // Must be the same as the seeds
    newUser.password = hash;

    const user = await Users.insert(newUser);

    if (user) {
      const newUserProfile = await Users.find()
        .where({
          username: newUser.username
        })
        .first();
      const token = tokenService.generateToken(newUserProfile);
      res.status(200).json({
        error: false,
        message: "Your account was created successfully.",
        token,
        user: {
          id: newUserProfile.id,
          username: newUserProfile.username,
          firstName: newUserProfile.firstName,
          lastName: newUserProfile.lastName,
          email: newUserProfile.email,
          created_at: newUserProfile.created_at,
          updated_at: newUserProfile.updated_at
        }
      });
    } else {
      res.status(404).json({
        error: true,
        user: {},
        message: "Your account could not be created in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
      message: "There was a problem with your request."
    });
  }
});

// User login request
router.post("/login", async (req, res) => {
  let creds = req.body;
  if (!creds.username || !creds.password) {
    return res.status(406).json({
      error: true,
      user: {},
      message: "Please include a username and password and try again."
    });
  } else {
    try {
      const user = await Users.find()
        .where({ username: creds.username })
        .first();
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = tokenService.generateToken(user);
        const {
          id,
          username,
          firstName,
          lastName,
          email,
          created_at,
          updated_at
        } = user;
        res.status(200).json({
          error: false,
          message: "You were logged in successfully.",
          token,
          user: {
            id,
            username,
            firstName,
            lastName,
            email,
            created_at,
            updated_at
          }
        });
      } else {
        res.status(404).json({
          error: true,
          user: {},
          message: "Sorry, you could not be logged in."
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        user: {},
        message: "There was a problem with your request."
      });
    }
  }
});

module.exports = router;
