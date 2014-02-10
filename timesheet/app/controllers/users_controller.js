var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  db = require('../services/db.js');

var UsersController = new Controller();

UsersController.index = function() {
  var controller = this;

  controller.req.session.me = "hello";

  db.find('users', controller.req.query)
    .then(function (users) {
      controller.res.json(users);
    },
    function (err) {
      controller.res.status(500).json(err);
    });
};

UsersController.create = function() {
  var controller = this;

  db.insert('users', controller.req.body)
    .then(function (user) {
      controller.res.json(user);
    },
    function (err) {
      controller.res.status(500).json(err);
    });
};

UsersController.show = function() {
  var controller = this;
  var id = this.param('id');

  console.log("session : " + JSON.stringify(controller.req.session));

  db.findOne('users', {_id: id})
    .then(function (user) {
      controller.res.json(user);
    },
    function (err) {
      controller.res.status(500).json(err);
    });
};

UsersController.update = function() {
  var controller = this;
  var id = this.param('id');

  db.update('users', {_id: id}, controller.req.body)
    .then(function (user) {
      controller.res.json(user);
    },
    function (err) {
      controller.res.status(500).json(err);
    });
};

UsersController.destroy = function() {
  var controller = this;
  var id = this.param('id');

  db.remove('users', {_id: id})
    .then(function () {
      controller.res.send(200);
    },
    function (err) {
      controller.res.status(500).json(err);
    });
};

module.exports = UsersController;