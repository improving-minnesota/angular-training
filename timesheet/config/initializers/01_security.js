/*global module, require, console*/
/*jslint nomen: false*/

var express = require('express')
  , passport = require('passport')
  , properties = require('../properties')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../../app/models/user')
  ;

module.exports = function () {

  console.log('Configuring Application Security');

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
};