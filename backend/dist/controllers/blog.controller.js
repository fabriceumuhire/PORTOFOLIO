"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likeOne = exports.deleteOne = exports.updateOne = exports.getOne = exports.postOne = exports.getAll = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _blog = _interopRequireDefault(require("../models/blog.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_cloudinary["default"].config('../utils/cloudinary.js');

var getAll = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var articles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _blog["default"].find();

          case 3:
            articles = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: articles
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0.message
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var postOne = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var articles, article;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req.body.image = req.image;
            req.body.imageId = req.imageId;
            _context2.prev = 2;
            articles = new _blog["default"](req.body);
            _context2.next = 6;
            return articles.save();

          case 6:
            article = _context2.sent;
            return _context2.abrupt("return", res.status(201).json({
              message: article
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0.message
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function postOne(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postOne = postOne;

var getOne = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var article;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _blog["default"].findOne({
              _id: req.params.id
            }).populate('comments');

          case 3:
            article = _context3.sent;
            _context3.next = 6;
            return article.views++;

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              message: article
            }));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(404).json({
              error: _context3.t0.message
            }));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function getOne(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOne = getOne;

var updateOne = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var articles, article;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _blog["default"].findOne({
              _id: req.params.id
            });

          case 2:
            articles = _context4.sent;
            _context4.prev = 3;

            if (req.body.title) {
              articles.title = req.body.title;
            }

            if (req.body.content) {
              articles.content = req.body.content;
            }

            _context4.next = 8;
            return articles.save();

          case 8:
            article = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: article
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](3);
            return _context4.abrupt("return", res.status(500).json({
              error: _context4.t0.message
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 12]]);
  }));

  return function updateOne(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateOne = updateOne;

var deleteOne = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _cloudinary["default"].v2.uploader.destroy(req.params.publicId, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _blog["default"].deleteOne({
                        _id: req.params.id
                      });

                    case 2:
                      return _context5.abrupt("return", res.status(204).json({
                        message: 'Article deleted successfully'
                      }));

                    case 3:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteOne(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteOne = deleteOne;

var likeOne = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var likeArticle, article;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _blog["default"].findOneAndUpdate({
              _id: req.params.id
            }, {
              $inc: {
                likes: 1
              }
            });

          case 3:
            likeArticle = _context7.sent;
            _context7.next = 6;
            return _blog["default"].findOne({
              _id: req.params.id
            });

          case 6:
            article = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              message: 'Liked message',
              article: article
            }));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(500).json({
              error: _context7.t0.message
            }));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function likeOne(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.likeOne = likeOne;