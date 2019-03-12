const express = require("express");
const Users = require("./usersModel.js");
const bcrypt = require("bcryptjs");

// Cloudinary and multer imports
const { multerUploads, dataUri } = require("../common/multerMiddleware.js");
const { uploader, cloudinaryConfig } = require("../config/cloudinary.js");

const router = express.Router();

// Pass through cloudinary middleware
cloudinaryConfig(router);

// Get all users request
router.get("/", async (req, res) => {
  try {
    const users = await Users.findWithoutPassword();
    if (users.length) {
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
    const user = await Users.findById(req.params.id);
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
router.put("/:id", multerUploads, async (req, res) => {
  const { username, password, first_name, last_name, email } = JSON.parse(
    req.body.user
  );
  if (!username || !password || !first_name || !last_name || !email) {
    res.status(406).json({
      error: true,
      user: {},
      message: "Please include all required fields and try again.",
      numUpdated: 0
    });
  }
  try {
    // JSON.parse() and destructure req.body
    const parsedNewUser = JSON.parse(req.body.user);
    console.log(parsedNewUser);

    // Strip image file from request and send to cloudinary for returned URL or null if failed
    const file = dataUri(req).content;
    let imgUrl = null;
    if (file) {
      const result = await uploader.upload(file);
      imgUrl = result.url;
    }

    // Hash password comparisons
    const hash = bcrypt.hashSync(parsedNewUser.password, 14);
    parsedNewUser.password = hash;

    // Conditionaly insertion of updated URL if new picture or reuse existing one if noe
    const picture = imgUrl ? imgUrl : parsedNewUser.profile_picture;

    // Compile new user and insert into database
    const compiledUser = { ...parsedNewUser, profile_picture: picture };
    const updatedUser = await Users.update(req.params.id, compiledUser);
    if (updatedUser) {
      const user = await Users.find()
        .where({
          username
        })
        .first();
      res.status(200).json({
        error: false,
        message: "Your profile was updated successfully.",
        numUpdated: updatedUser,
        user: {
          user_id: user.user_id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.first_name,
          email: user.email,
          profile_picture: user.profile_picture,
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
