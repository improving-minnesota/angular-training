var express = require('express'),
  passport = require('passport'),
  MongoStore = require('connect-mongo')(express),
  poweredBy = require('connect-powered-by'),
  util = require('util'),
  properties = require('../properties'),
  proxy = require('../proxy');

module.exports = function() {
  console.log('Starting all configuration');

  // Warn of version mismatch between global "lcm" binary and local installation
  // of Locomotive.
  if (this.version !== require('locomotive').version) {
    console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
  }

  // Configure application settings.  Consult the Express API Reference for a
  // list of the available [settings](http://expressjs.com/api.html#app-settings).
  this.set('views', __dirname + '/../../app/views');

  // Setup jade templates
  this.set('view engine', 'jade');
  this.engine('jade', require('jade').__express);
  this.format('html', {extension: 'jade'});

  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  this.use(poweredBy('Locomotive'));
  this.use(express.logger());
  this.use(express.favicon());
  this.use(express.compress());
  this.use(express.cookieParser(properties.security.cookieSecret));
  this.use(proxy);
  this.use(express.bodyParser());

  this.use(passport.initialize());
  this.use(passport.session());
  this.use(this.router);

  console.log('Finished all configuration');
  
};
