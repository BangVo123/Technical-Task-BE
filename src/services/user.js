const User = require("../models/user");
const AppError = require("../core/AppError");
const jwt = require("jsonwebtoken");
const sendMail = require("../util/mailer");

class UserService {
  static register = async ({ username, email, password, role = "user" }) => {
    const foundUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (foundUser) throw new AppError("User already exists", 400);

    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    const newUserObj = newUser.toObject();

    const excludeFields = ["password", "role"];

    for (const item of excludeFields) {
      delete newUserObj[item];
    }

    return newUserObj;
  };

  static login = async ({ username, password }) => {
    const foundUser = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select("+password");

    if (!foundUser) throw new AppError("User not found", 400);

    const compare = await foundUser.comparePass(password, foundUser.password);

    if (!compare) throw new AppError("Something went wrong");

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token };
  };

  static sendMail = async (email) => {
    const foundUser = await User.findOne({ email });

    if (!foundUser) throw new AppError("User not exists", 400);

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const resetPassUrl = `${process.env.FRONTEND_BASE_URL}/resetPassword?token=${token}`;

    const auth = {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    };

    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset password",
      text: `Please click this link to reset password (Notice that you has 5 minutes to reset password): \n ${resetPassUrl}`,
    };

    return await sendMail({ auth, options });
  };

  static resetPassword = async ({ token, password }) => {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const expired = new Date(decode.exp);
    if (expired > new Date())
      throw new AppError("Token had expired, try again");

    const foundUser = await User.findById(decode.id).select("+password");

    if (!foundUser) throw new AppError("Invalid token or user not found", 404);

    foundUser.password = password;

    return await foundUser.save();
  };

  static getAllUser = async () => {
    return await User.find({ role: "user" }).select("+role");
  };
}

module.exports = UserService;
