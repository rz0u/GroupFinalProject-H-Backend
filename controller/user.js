const User = require("../models/User");
const path = require("path");
const router = require("express").Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const upload = require("../utils/multer");
const isAuthenticated = require("../middleware/auth");

// Register User //sendmail belum dicoba
router.post("/register", upload.single("file"), async (req, res, next) => {
  try {
    const { shopName, email, password, address, zipcode, phoneNumber } =
      req.body;
    const userEmail = await User.get({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      shopName: shopName,
      email: email,
      password: password,
      avatar: fileUrl,
      address: address,
      zipcode: zipcode,
      phoneNumber: phoneNumber,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://lokalestari.app/activation/${activationToken}`; //Contoh URL

    try {
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.shopName}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Email sent to: ${user.email}, click on the link to activate your account!`,
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

      const existingUser = await User.get({ email });
      if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const user = await User.register({
        shopName: newUser.shopName,
        email: newUser.email,
        password: newUser.password,
        avatar: newUser.fileUrl,
        address: newUser.address,
        zipcode: newUser.zipcode,
        phoneNumber: newUser.phoneNumber,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login User
router.post(
  "/login",
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

      const isPasswordMatched = await User.compare_password(
        password,
        user.password
      );
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
  "/getuser",
  isAuthenticated,
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

// // Logout User (handle di front-end aja)
// router.get(
//   "/logout",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       localStorage.removeItem("token");

//       res.status(201).json({
//         success: true,
//         message: "Log out successful!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// Update User Info //update apa aja?
router.put(
  "/update-user",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.get({ email });
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordMatched = await User.compare_password(
        password,
        user.password
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
