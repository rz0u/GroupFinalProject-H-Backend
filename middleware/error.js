const { Prisma } = require("@prisma/client");
const { PrismaClientKnownRequestError } = Prisma;
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Prisma known request error
  if (err instanceof PrismaClientKnownRequestError) {
    // Assuming a 404 status code for not found error
    if (err.code === "P2025") {
      const message = `Resource not found with this id`;
      err = new ErrorHandler(message, 404);
    }
    // Assuming a 400 status code for other Prisma known errors
    else {
      const message = `Prisma error: ${err.message}`;
      err = new ErrorHandler(message, 400);
    }
  }

  // Duplicate key error
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const message = `Duplicate key ${Object.keys(err.meta.target)[0]} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire Error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
