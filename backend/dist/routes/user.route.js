"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../middlewares/user.middleware");

var _user2 = require("../validators/user.validator");

var _user3 = require("../controllers/user.controller");

var userRouter = (0, _express.Router)();
userRouter.get('/', _user3.getUser);
userRouter.post('/register', _user2.registerValidation, _user.emailExist, _user3.registerUser);
userRouter.post('/login', _user.Authenticate, _user3.loginUser);
var _default = userRouter;
exports["default"] = _default;