const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

const isAuthorized = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }
  const token = authHeader.split(" ")[1];
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.auth = await User.get({ id: decodedData.id });

  next();
});

const isAdmin = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new ErrorHandler(`Not authorized.`, 403));
    }
    next();
  };
};

module.exports = { isAuthenticated, isAdmin, isAuthorized };
