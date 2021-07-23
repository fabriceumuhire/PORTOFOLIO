"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _blog = require("../controllers/blog.controller");

var _blog2 = _interopRequireDefault(require("../validators/blog.validator"));

var _image = require("../middlewares/image.middleware");

var _auth = require("../utils/auth.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blogRouter = (0, _express.Router)();
blogRouter.get('/', _blog.getAll);
blogRouter.post('/', _auth.tokenAuth, _image.uploadImage, _blog2["default"], _blog.postOne);
blogRouter.get('/:id', _blog.getOne);
blogRouter.patch('/:id', _auth.tokenAuth, _image.blogExists, _blog.updateOne);
blogRouter.patch('/like/:id', _image.blogExists, _blog.likeOne);
blogRouter["delete"]('/:id', _auth.tokenAuth, _image.blogExists, _blog.deleteOne);
var _default = blogRouter;
exports["default"] = _default;