(function () {
  'use strict';

  var logger = window.debug;
  logger.group("Registering Pagination module");

  var app = angular.module('navigation.pagination', [
    'navigation.pagination.directives',
    'navigation.pagination.controllers',
    'navigation.pagination.services'
  ]);

  logger.debug("Pagination module bootstrapped.");
  logger.groupEnd(); 

}());