"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _query = require("../controllers/query.controller");

var _query2 = _interopRequireDefault(require("../validators/query.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var queryRouter = (0, _express.Router)();
queryRouter.post('/', _query2["default"], _query.postOne);
queryRouter.get('/', _query.getAll);
queryRouter.get('/:id', _query.getOne);
var _default = queryRouter;
exports["default"] = _default;