"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _assert = _interopRequireDefault(require("assert"));

var _path = _interopRequireDefault(require("path"));

var _app = _interopRequireDefault(require("../app"));

var _blog = _interopRequireDefault(require("../models/blog.model"));

var _server = _interopRequireDefault(require("../server"));

var _auth = require("../utils/auth.util");

var _user = require("./mock/user.mock");

var _blog2 = require("./mock/blog.mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var blogId;
var token = (0, _auth.tokenGenerator)(_user.loginUser);
describe('Article API', function () {
  before( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _server["default"])();

          case 2:
            _context.next = 4;
            return _blog["default"].deleteMany({});

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))); // Get function tests

  describe('Blog tests', function () {
    it('It should POST a new article', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var article;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/blogs').set('Authorization', token).field(_blog2.newBlog).attach('image', "".concat(_path["default"].join(__dirname, '../uploads/img/ideas.jpg'))).type('form');

            case 2:
              article = _context2.sent;

              _assert["default"].equal(article.status, 201);

              article.should.have.status(201);
              article.should.have.property('status');
              article.body.should.have.property('message');
              blogId = article.body.message._id;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))).timeout(50000);
    it('It should NOT POST a query', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/blogs').set('Authorization', token).send(_blog2.badBlog).end(function (error, res) {
        res.should.have.status(400);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    }).timeout(30000);
    it('It should NOT POST a query', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/blogs').field(_blog2.badBlog).attach('image', "".concat(_path["default"].join(__dirname, '../uploads/img/ideas.jpg'))).type('form').end(function (error, res) {
        res.should.have.status(401);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should GET all articles', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/blogs').end(function (error, res) {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.should.have.property('status');
      });

      done();
    });
    it('It should NOT GET all articles', function (done) {
      _chai["default"].request(_app["default"]).get("/api/v1/blog/".concat(blogId)).end(function (error, res) {
        res.should.have.status(404);
        res.should.have.property('status'); // res.body.should.have.property('error');
      });

      done();
    });
    it('It should UPDATE a BLOG', function (done) {
      _chai["default"].request(_app["default"]).patch("/api/v1/blogs/".concat(blogId)).set('Authorization', token).field(_blog2.updateBlog).attach('image', "".concat(_path["default"].join(__dirname, '../uploads/img/review2.jpg'))).type('form').end(function (error, res) {
        res.should.have.status(200);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    }).timeout(50000);
    it('It should LIKE a BLOG', function (done) {
      _chai["default"].request(_app["default"]).patch("/api/v1/blogs/like/".concat(blogId)).end(function (error, res) {
        res.should.have.status(200);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should GET a single blog', function (done) {
      _chai["default"].request(_app["default"]).get("/api/v1/blogs/".concat(blogId)).end(function (error, res) {
        res.should.have.status(200);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should COMMENT on a blog', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/comments/".concat(blogId)).send(_blog2.newComment).end(function (error, res) {
        res.should.have.status(201);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should NOT COMMENT on a blog', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/comments/".concat(blogId)).send(_blog2.badComment).end(function (error, res) {
        res.should.have.status(400);
        res.should.have.property('status');
      });

      done();
    });
    it('It should NOT COMMENT on a blog', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/comment/".concat(blogId)).send(_blog2.newComment).end(function (error, res) {
        res.should.have.status(404);
        res.should.have.property('status');
      });

      done();
    });
    it('It should NOT DELETE a single article', function (done) {
      _chai["default"].request(_app["default"])["delete"]("/api/v1/blog/".concat(blogId)).set('Authorization', token).end(function (error, res) {
        res.should.have.status(404);
      });

      done();
    });
    it('It should DELETE a single article', function (done) {
      _chai["default"].request(_app["default"])["delete"]("/api/v1/blogs/".concat(blogId)).set('Authorization', token).end(function (error, res) {
        res.should.have.status(204);
      });

      done();
    });
  });
});