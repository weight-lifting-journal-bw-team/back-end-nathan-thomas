const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const dUri = new Datauri();

const dataUri = req => {
  if (req.file) {
    return dUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );
  } else {
    return req;
  }
};

module.exports = {
  multerUploads,
  dataUri
};
