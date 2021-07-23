"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  blog: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Blog'
  }
}, {
  timestamps: true,
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

var _default = _mongoose["default"].model('Comment', CommentSchema);

exports["default"] = _default;