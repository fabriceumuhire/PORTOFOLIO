"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenGenerator = exports.tokenAuth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();

var tokenAuth = function tokenAuth(req, res, next) {
  var token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'No authorization'
    });
  }

  try {
    var verification = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    req.user = verification;
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

exports.tokenAuth = tokenAuth;

var tokenGenerator = function tokenGenerator(user) {
  var payload = {
    userId: user._id,
    name: user.name,
    email: user.email
  };
  return _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.tokenGenerator = tokenGenerator;