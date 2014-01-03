(function () {
  
  'use strict';

  var logger = window.debug;
  logger.group("Registering app module");

  var app = angular.module('app', [
    'app.directives', 
    'app.controllers',
    'app.resources',
    'app.services',
    'rezr',
    'admin'
  ]);


  logger.debug("App module bootstrapped.");
  logger.groupEnd(); 

}());
