"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailExist = exports.Authenticate = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Authenticate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, pass;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Wrong email'
            }));

          case 5:
            _context.next = 7;
            return _bcryptjs["default"].compare(req.body.password, user.password);

          case 7:
            pass = _context.sent;

            if (pass) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(405).json({
              message: 'Wrong password'
            }));

          case 10:
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.Authenticate = Authenticate;

var emailExist = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var email;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 2:
            email = _context2.sent;

            if (!email) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: 'Email exists already'
            }));

          case 5:
            next();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function emailExist(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.emailExist = emailExist;