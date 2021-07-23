"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogExists = exports.uploadImage = void 0;

var _cloudinary = _interopRequireDefault(require("../utils/cloudinary"));

var _blog = _interopRequireDefault(require("../models/blog.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var tempFilePath, _yield$cloudinary$upl, url, pid;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.files) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            tempFilePath = req.files.image.tempFilePath;
            _context.next = 5;
            return _cloudinary["default"].upload(tempFilePath);

          case 5:
            _yield$cloudinary$upl = _context.sent;
            url = _yield$cloudinary$upl.url;
            pid = _yield$cloudinary$upl.public_id;
            req.image = url;
            req.imageId = pid;
            return _context.abrupt("return", next());

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadImage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImage = uploadImage;

var blogExists = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var blog;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _blog["default"].findOne({
              _id: req.params.id
            });

          case 2:
            blog = _context2.sent;

            if (blog) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: 'Blog do not exist'
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

  return function blogExists(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.blogExists = blogExists;