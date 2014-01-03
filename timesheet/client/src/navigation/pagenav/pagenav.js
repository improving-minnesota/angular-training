(function () {
  'use strict';

  var logger = window.debug;
  logger.group("Registering Pagenav module");

  var app = angular.module('navigation.pagenav', [
    'navigation.pagenav.directives',
    'navigation.pagenav.controllers'
  ]);

  logger.debug("Pagenav module bootstrapped.");
  logger.groupEnd(); 

}());
