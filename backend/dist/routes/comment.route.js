"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comment = _interopRequireDefault(require("../controllers/comment.controller"));

var _comment2 = _interopRequireDefault(require("../validators/comment.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentRouter = (0, _express.Router)();
commentRouter.post('/:id', _comment2["default"], _comment["default"]);
var _default = commentRouter;
exports["default"] = _default;