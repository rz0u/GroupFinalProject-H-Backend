const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");

// // Register User //sendmail belum dicoba
const registerUser = async (req, res, next) => {
  try {
    const { shopName, email, password, address, zipcode, phoneNumber, avatar } =
      req.body;
    const userEmail = await User.get({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = {
      shopName: shopName,
      email: email,
      password: password,
      avatar: avatar,
      address: address,
      zipcode: zipcode,
      phoneNumber: phoneNumber,
    };

    const activationToken = User.createActivationToken(user);

    const activationUrl = `${process.env.BASE_URL}/api/v1/user/activation/${activationToken}`; //Contoh URL

    try {
      await sendMail({
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
};

// // Activate User
const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const existingUser = await User.get({ email: newUser.email });
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
      avatar: newUser.avatar,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// // Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
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
});

// // Load User
const loadUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
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
});

// // Update User Info
const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { shopName, email, phoneNumber } = req.body;

    const user = await User.get({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const updatedUser = await User.update(req.user.id, {
      shopName: shopName,
      email: email,
      phoneNumber: phoneNumber,
    });

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// // Update User Adress
const updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const { address, zipcode } = req.body;

    const user = await User.get({ id: req.user.id });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const updatedUser = await User.update(user.id, {
      address: address,
      zipcode: zipcode,
    });
    res.status(201).json({
      success: true,
      message: "Address updated successfully!",
      updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// // Update User Password
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.get({ id: req.user.id });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordMatched = await User.compare_password(
      oldPassword,
      user.password
    );
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect old  password", 400));
    }
    // ---------- // ini dari frontend kayaknya
    // if (req.body.newPassword !== req.body.confirmPassword) {
    //   return next(new ErrorHandler("Password does not match", 400));
    // }

    password = await User.make_password(newPassword);

    await User.update(user.id, { password });

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// // Find User with ID
const findUserId = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.get({ id: userId });
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
});

// // Find all Users --- For Admin
const findAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find({ orderBy: "desc" });
    const usersResponse = users.map((user) => {
      const { password, resetPasswordToken, ...userResponse } = user;
      return userResponse;
    });
    res.status(200).json({
      success: true,
      usersResponse,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// // Delete User --- For Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.get({ id: userId });

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    await User.delete(user.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  loadUser,
  updateUser,
  updateUserAddress,
  updateUserPassword,
  findUserId,
  findAllUsers,
  deleteUser,
};