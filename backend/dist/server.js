"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
/**
 * Connect to the database
 */

var server = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _process$env, MONGO_URL, MONGO_URL_TEST, NODE_ENV, conn;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _process$env = process.env, MONGO_URL = _process$env.MONGO_URL, MONGO_URL_TEST = _process$env.MONGO_URL_TEST, NODE_ENV = _process$env.NODE_ENV;
            _context.next = 3;
            return _mongoose["default"].connect(NODE_ENV === 'test' ? MONGO_URL_TEST : MONGO_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              useCreateIndex: true
            });

          case 3:
            conn = _context.sent;
            console.log("DB Connected: ".concat(conn.connection.host, " in ").concat(NODE_ENV, " mode"));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function server() {
    return _ref.apply(this, arguments);
  };
}();

var _default = server;
exports["default"] = _default;