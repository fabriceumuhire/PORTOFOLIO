"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable import/prefer-default-export */
var registerValidation = function registerValidation(req, res, next) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(6).required(),
    email: _joi["default"].string().min(6).required().email(),
    password: _joi["default"].string().min(6).required()
  });

  var options = {
    abortEarly: false
  };

  var _schema$validate = schema.validate(req.body, options),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    return res.status(402).send({
      message: 'Invalid inputs'
    });
  }

  next();
};

exports.registerValidation = registerValidation;