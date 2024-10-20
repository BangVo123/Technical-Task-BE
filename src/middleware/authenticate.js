const jwt = require("jsonwebtoken");
const asyncHandler = require("../helper/asyncHandler");
const AppError = require("../core/AppError");

const authenticate = (req, res, next) => {
  const token = req.headers.token;

  if (!token) throw new AppError("User not authenticate", 401);

  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (error) throw new AppError(error.message, error.statusCode);
    req.user = decode.id;
  });

  next();
};

module.exports = authenticate;
