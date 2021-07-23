"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _assert = _interopRequireDefault(require("assert"));

var _app = _interopRequireDefault(require("../app"));

var _server = _interopRequireDefault(require("../server"));

var _query = _interopRequireDefault(require("../models/query.model"));

var _query2 = require("./mock/query.mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var queryId;
describe('Queries API', function () {
  before( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _server["default"])();

          case 2:
            _context.next = 4;
            return _query["default"].deleteMany({});

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('POST /api/query', function () {
    it('It should POST new Query', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var post;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/query').send(_query2.newQuery);

            case 2:
              post = _context2.sent;

              _assert["default"].equal(post.status, 201);

              post.should.have.property('status');
              post.body.should.have.property('message');
              _context2.next = 8;
              return post.body.message._id;

            case 8:
              queryId = _context2.sent;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('It should NOT POST a query', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/query').send(_query2.badQuery).end(function (error, res) {
        res.should.have.status(400);
        res.should.have.property('status');
      });

      done();
    });
    it('It should GET all queries', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/query').end(function (error, res) {
        res.should.have.status(200);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should GET a single query', function (done) {
      _chai["default"].request(_app["default"]).get("/api/v1/query/".concat(queryId)).end(function (error, res) {
        res.should.have.status(200);
        res.should.have.property('status');
        res.body.should.have.property('message');
      });

      done();
    });
    it('It should not GET any query', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/queries').end(function (error, res) {
        res.should.have.status(404);
        res.should.have.property('status');
      });

      done();
    });
  });
});