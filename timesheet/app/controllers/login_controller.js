var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  Q = require('q'),
  db = require('../services/db.js'),
  _ = require('lodash'),
  security = require('../services/security.js');

var LoginController = new Controller();

LoginController.index = function() {
  var controller = this;
  
  controller.res.json(this.req.session);
};

LoginController.create = function() {
  security.login(this.__req, this.__res, this.__next);
};

module.exports = LoginController;