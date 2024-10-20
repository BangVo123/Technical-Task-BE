const authenticate = require("../../middleware/authenticate");
const permission = require("../../middleware/permission");
const AdminController = require("../../controller/admin");
const asyncHandler = require("../../helper/asyncHandler");

const route = require("express").Router();

route.get(
  "/",
  authenticate,
  permission,
  asyncHandler(AdminController.getAllUser)
);

module.exports = route;
