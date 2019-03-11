// Import Express
const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");
const tokenService = require("../auth/tokenService.js");
const authConstraints = require("./authConstraints.js");

// Creates router for specific API route
const router = express.Router();

// New user registration request
router.post("/register", authConstraints, async (req, res) => {
  try {
    // Encryption of password
    const hash = bcrypt.hashSync(req.body.password, 14); // Must be the same as the seeds
    req.body.password = hash;
    const user = await Users.insert(req.body);
    if (user) {
      const newUserProfile = await Users.find()
        .where({
          username
        })
        .first();
      const token = tokenService.generateToken(user);
      res.status(200).json({
        message: "Your account was created successfully.",
        token,
        user: {
          user_id: newUserProfile.user_id,
          username,
          first_name,
          last_name,
          email,
          created_at: newUserProfile.created_at,
          updated_at: newUserProfile.updated_at
        }
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your account could not be created in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
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
          user_id,
          username,
          first_name,
          last_name,
          email,
          created_at,
          updated_at
        } = user;
        res.status(200).json({
          message: "You were logged in successfully.",
          token,
          user: {
            user_id,
            username,
            first_name,
            last_name,
            email,
            created_at,
            updated_at
          }
        });
      } else {
        res.status(404).json({
          error: true,
          message: "Sorry, that account does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "There was a problem with your request."
      });
    }
  }
});

module.exports = router;
