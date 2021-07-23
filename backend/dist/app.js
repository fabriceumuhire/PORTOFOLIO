"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _routes = _interopRequireDefault(require("./routes"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT;
(0, _server["default"])();
/**
 * Middleware
 */

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFileupload["default"])({
  createParentPath: true,
  useTempFiles: true
}));
app.use('/api/v1', _routes["default"]);
app.listen(PORT, console.log("Server started at http://localhost:".concat(PORT)));
var _default = app;
exports["default"] = _default;