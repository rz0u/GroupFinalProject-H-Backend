const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.get({ id: decodedData.id });

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

isAdmin = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new ErrorHandler(`Not authorized.`, 403));
    }
    next();
  };
};

module.exports = { isAuthenticated, isAdmin };
