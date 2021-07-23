"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user.route"));

var _query = _interopRequireDefault(require("./query.route"));

var _blog = _interopRequireDefault(require("./blog.route"));

var _comment = _interopRequireDefault(require("./comment.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRouter = (0, _express.Router)();
indexRouter.use('/user', _user["default"]);
indexRouter.use('/query', _query["default"]);
indexRouter.use('/blogs', _blog["default"]);
indexRouter.use('/comments', _comment["default"]);
var _default = indexRouter;
exports["default"] = _default;