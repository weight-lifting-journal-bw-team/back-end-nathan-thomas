// Import Express
const express = require("express");

// Creates router for specific API route
const router = express.Router();

// Cloudinary and multer imports
const { multerUploads, dataUri } = require("../common/multerMiddleware.js");
const { uploader, cloudinaryConfig } = require("../config/cloudinary.js");

// Pass through cloudinary middleware
cloudinaryConfig(router);

router.post("/", multerUploads, async (req, res) => {
  try {
    const file = dataUri(req).content;
    const result = await uploader.upload(file);
    const imgUrl = result.url;
    if (imgUrl) {
      res.status(200).json({
        error: false,
        message: "Your image was uploaded successfully.",
        image: { imgUrl }
      });
    } else {
      res.status(409).json({
        error: true,
        message: "Your image could not be uploaded.",
        image: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was a problem with your request.",
      image: {}
    });
  }
});

module.exports = router;
