var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  Q = require('q'),
  db = require('../services/db.js'),
  _ = require('lodash');

var LoginController = new Controller();

LoginController.index = function() {
  var controller = this;
  
};

LoginController.create = function() {
  var controller = this;

};

module.exports = LoginController;