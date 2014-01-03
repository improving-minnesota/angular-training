(function () {

  var logger = window.debug;

  logger.debug("Loading common.color.picker module.");

  var app = angular.module('common.color.picker', [
    'common.color.picker.controllers',
    'common.color.picker.directives',
    'common.color.picker.services'
  ]);

  logger.debug("common.color.picker module loaded.");

}());
