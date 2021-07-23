"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.registerUser = exports.getUser = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _auth = require("../utils/auth.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();

          case 2:
            user = _context.sent;
            return _context.abrupt("return", res.status(200).json(user));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var registerUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var hashed, hashPass, user, savedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            hashed = _context2.sent;
            _context2.next = 5;
            return _bcryptjs["default"].hash(req.body.password, hashed);

          case 5:
            hashPass = _context2.sent;
            _context2.prev = 6;
            user = new _user["default"]({
              name: req.body.name,
              email: req.body.email,
              password: hashPass
            });
            _context2.next = 10;
            return user.save();

          case 10:
            savedUser = _context2.sent;
            return _context2.abrupt("return", res.status(201).json({
              message: savedUser
            }));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](6);
            return _context2.abrupt("return", res.status(500).json(_context2.t0));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 14]]);
  }));

  return function registerUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var loginUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, webToken;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 3:
            user = _context3.sent;
            webToken = (0, _auth.tokenGenerator)(user);
            return _context3.abrupt("return", res.status(200).json({
              user: user,
              token: webToken
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function loginUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;