const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const dUri = new Datauri();

const dataUri = req => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

module.exports = {
  multerUploads,
  dataUri
};

// const obj = {
//   hello: "world"
// };
// const json = JSON.stringify(obj);
// const blob = new Blob([json], {
//   type: 'application/json'
// });
// const data = new FormData();
// data.append("document", blob);
// axios({
//   method: 'post',
//   url: '/sample',
//   data: data,
// })
