var express = require('express')
  , passport = require('passport')
  ;

var filterUser = function(user) {
  if ( user ) {
    return {
      user : {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    };
  } else {
    return { user: null };
  }
};

var security = {
  authenticationRequired: function(req, res, next) {
    console.log('authRequired');
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },

  adminRequired: function(req, res, next) {
    console.log('adminRequired');
    if (req.user && req.user.admin ) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },

  sendCurrentUser: function(req, res, next) {
    console.log('Sending current user: ' + req.user);
    console.log('req.session : ' + req.session);
    var currentUser = filterUser(req.user);
    console.log(currentUser);
    res.json(200, currentUser);
  },

  login: function(req, res, next) {
    function authenticationFailed(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json(filterUser(user)); }

      req.login(user, function(err) {
        if ( err ) { return next(err); }
        return res.json(filterUser(user));
      });
    }

    return passport.authenticate('local', authenticationFailed)(req, res, next);
  },

  logout: function(req, res, next) {
    req.logout();
    res.send(204);
  }
};

module.exports = security;