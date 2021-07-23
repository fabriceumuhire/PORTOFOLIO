"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _server = _interopRequireDefault(require("../server"));

var _user2 = require("./mock/user.mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Register API', function () {
  before( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _server["default"])();

          case 2:
            _context.next = 4;
            return _user["default"].deleteMany({});

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('POST /api/routes', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            it('It should POST new user', function (done) {
              _chai["default"].request(_app["default"]).post('/api/v1/user/register').send(_user2.newUser).end(function (error, res) {
                res.should.have.property('status');
                res.body.should.have.property('message');
                res.should.have.status(201);
              });

              done();
            });
            it('It should not POST new user(wrong email)', function (done) {
              _chai["default"].request(_app["default"]).post('/api/v1/user/register').send(_user2.wrongUser).end(function (error, res) {
                res.should.have.status(402);
                res.should.have.property('status');
                res.body.should.have.property('message');
              });

              done();
            });
            it('It should not POST new user(wrong password)', function (done) {
              _chai["default"].request(_app["default"]).post('/api/v1/user/register').send(_user2.wrongPass).end(function (error, res) {
                res.should.have.status(402);
                res.should.have.property('status');
                res.body.should.have.property('message');
              });

              done();
            });
            it('It should not POST existing user', function (done) {
              _chai["default"].request(_app["default"]).post('/api/v1/user/register').send(_user2.newUser).end(function (error, res) {
                res.body.should.have.property('error');
                res.should.have.status(400);
                res.should.have.property('status');
                res.body.should.have.property('error');
              });

              done();
            });
            it('Login with invalid password', function (done) {
              var wrongPassword = {
                email: _user2.newUser.email,
                password: _user2.wrongPass.password
              }; // send request to the app

              _chai["default"].request(_app["default"]).post('/api/v1/user/login').send(wrongPassword).end(function (error, res) {
                res.should.have.status(405);
                res.should.have.property('status');
              });

              done();
            });
            it('Login with invalid email', function (done) {
              var errorEmail = {
                email: _user2.wrongUser.email,
                password: _user2.newUser.password
              }; // send request to the app

              _chai["default"].request(_app["default"]).post('/api/v1/user/login').send(errorEmail).end(function (error, res) {
                res.should.have.status(401);
                res.should.have.property('status');
              });

              done();
            });
            it('It should GET all users', function (done) {
              _chai["default"].request(_app["default"]).get('/api/v1/user').end(function (error, res) {
                res.should.have.status(200);
                res.should.have.property('status');
              });

              done();
            });
            it('User should login', function (done) {
              // send request to the app
              try {
                _chai["default"].request(_app["default"]).post('/api/v1/user/login').send(_user2.loginUser).end(function (error, res) {
                  res.should.have.status(200);
                  res.should.have.property('status');
                });

                done();
              } catch (error) {
                return error.message[0];
              }
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});