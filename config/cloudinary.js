const { config, uploader } = require("cloudinary");
require("dotenv").config();

const cloudinaryConfig = route => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

module.exports = {
  cloudinaryConfig,
  uploader
};
