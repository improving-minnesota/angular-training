/*global module, require, console*/
/*jslint nomen: false*/

var express = require('express'), 
  passport = require('passport'), 
  LocalStrategy = require('passport-local').Strategy,
  db = require('../../app/services/db.js');

module.exports = function () {

  console.log('Configuring Application Security');

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.users.find({_id: id}, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.users.find({username: username}, function (err, user) {
        console.log("authentication : " + JSON.stringify(user));
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        
        if (user.password === password) { 
          console.log("returning user");
          return done(null, user); 
        }
        console.log("returning false : " + password + ", " + user.password);
        return done(null, false);
      });
    }
  ));
};