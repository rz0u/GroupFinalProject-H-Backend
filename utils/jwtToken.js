const User = require("../models/User");

const sendToken = (user, statusCode, res) => {
  const token = User.getJwtToken(user);

  // Set the token in the response headers
  res.setHeader("Authorization", `Bearer ${token}`);

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
