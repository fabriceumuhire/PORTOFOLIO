"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
var blogValidation = function blogValidation(req, res, next) {
  var schema = _joi["default"].object({
    title: _joi["default"].string().min(10).required(),
    content: _joi["default"].string().min(50).required()
  });

  var options = {
    abortEarly: false
  };

  var _schema$validate = schema.validate(req.body, options),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    return res.status(400).json({
      message: 'Invalid inputs'
    });
  }

  next();
};

var _default = blogValidation;
exports["default"] = _default;