const SuccessResponse = require("../core/SuccessResponse");
const UserService = require("../services/user");

class AdminController {
  static getAllUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await UserService.getAllUser(),
    }).send(res);
  };
}

module.exports = AdminController;
