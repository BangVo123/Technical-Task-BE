const UserService = require("../services/user");
const SuccessResponse = require("../core/SuccessResponse");

class UserController {
  static register = async (req, res, next) => {
    new SuccessResponse({
      message: "Register success",
      metadata: await UserService.register(req?.body),
    }).send(res);
  };

  static login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success",
      metadata: await UserService.login(req.body),
    }).send(res);
  };

  static forgotPassword = async (req, res, next) => {
    new SuccessResponse({
      message: "Please check your email to reset password",
      metadata: await UserService.sendMail(req.body.email),
    }).send(res);
  };

  static resetPassword = async (req, res, next) => {
    new SuccessResponse({
      message: "Reset password success",
      metadata: await UserService.resetPassword(req.body),
    }).send(res);
  };
}

module.exports = UserController;
