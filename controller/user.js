const User = require("../models/User");
const path = require("path");
const router = require("express").Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const upload = require("../utils/multer");
import * as jwt from "jsonwebtoken";

// Register User //sendmail belum jadi
router.post("/register", upload.single("file"), async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userEmail = await User.get({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      username: username,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    console.log(user);
    const activationToken = createActivationToken(user);

    const activationUrl = `https://tokokamu.app/activation/${activationToken}`; //Contoh URL

    const newUser = await User.register({ username, email, password, avatar });
    res.status(201).json({
      success: true,
      newUser,
    });

    try {
      await sendEmail({
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.username}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Email sent to: ${newUser.email}, click on the link to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { username, email, password } = newUser;
      let user = await User.get({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.register({ username, email, password });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await User.get({ email });
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordMatched = await User.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Load User
router.get(
  "/load-user",
  //isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.get({ id: req.user.id });

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Logout User
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      localStorage.removeItem("token");

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update User Info //update apa aja?
router.put(
  "/update-user",
  //isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.get({ email });
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordMatched = await User.compare_password(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
