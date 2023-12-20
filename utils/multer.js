const multer = require("multer");
const path = require("path");

const destinationPath = path.join(__dirname, "..");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(destinationPath, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage: storage });
