const express = require("express");
const asyncHandler = require("../../helper/asyncHandler");
const UserController = require("../../controller/user");

const route = express.Router();

route.post("/register", asyncHandler(UserController.register));
route.post("/login", asyncHandler(UserController.login));
route.post("/forgot-password", asyncHandler(UserController.forgotPassword));
route.post("/reset-password", asyncHandler(UserController.resetPassword));

module.exports = route;
