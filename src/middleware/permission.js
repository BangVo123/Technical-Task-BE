const AppError = require("../core/AppError");
const User = require("../models/user");

const permission = async (req, res, next) => {
  const foundAdmin = await User.findById(req.user)
    .where({ role: "admin" })
    .select("+role");
  if (!foundAdmin) next(new AppError("User has not permission", 405));
  next();
};

module.exports = permission;
