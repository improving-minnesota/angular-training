(function () {

  var logger = window.debug;

  logger.debug("Loading common module.");

  var app = angular.module('common', [
    'common.form.directives',
    'common.form.field.directives',
    'common.form.controllers',
    'common.formatting.filters',
    'common.io.interceptors'
  ]);

  logger.debug("Common module loaded.");

}());
