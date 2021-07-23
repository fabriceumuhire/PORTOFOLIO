"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
var articleValidation = function articleValidation(req, res, next) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(6).required(),
    email: _joi["default"].string().min(6).required().email(),
    subject: _joi["default"].string().min(10).max(50).required(),
    message: _joi["default"].string().min(20).required()
  });

  var options = {
    abortEarly: false
  };

  var _schema$validate = schema.validate(req.body, options),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    return res.status(400).send({
      message: 'Invalid inputs'
    });
  }

  next();
};

var _default = articleValidation;
exports["default"] = _default;