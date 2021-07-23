"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BlogSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageId: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    "default": 0
  },
  likes: {
    type: Number,
    "default": 0
  },
  comments_count: {
    type: Number,
    "default": 0
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectID,
    ref: 'Comment'
  }]
});

var _default = _mongoose["default"].model('Blog', BlogSchema);

exports["default"] = _default;