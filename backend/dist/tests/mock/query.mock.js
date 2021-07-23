"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badQuery = exports.newQuery = void 0;
var newQuery = {
  name: 'Sys Administrator',
  email: 'dearly@hello.com',
  subject: 'Testing request post',
  message: 'Hello this is a test request'
};
exports.newQuery = newQuery;
var badQuery = {
  name: 'Sys Administrator',
  subject: 'Testing request post',
  message: 'Hello this is a test request'
};
exports.badQuery = badQuery;