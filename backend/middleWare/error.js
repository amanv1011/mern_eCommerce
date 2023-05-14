const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongo DB ID Error
  if (err.name == "CastError") {
    const message = `Resource not fonud. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrng JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire Error

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    // error: err,
    message: err.message,
  });
};
