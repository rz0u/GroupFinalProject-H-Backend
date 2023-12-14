const User = require("../models/User");
const path = require("path");
const router = require("express").Router();
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../utils/multer");

router.post("/register", upload.single("file"), async (req, res, next) => {
  const { username, email, password } = req.body;
  const userEmail = await User.get({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.filename;
  const avatar = path.join(filename);

  const user = {
    username: username,
    email: email,
    password: password,
    avatar: fileUrl,
  };
});

module.exports = router;
