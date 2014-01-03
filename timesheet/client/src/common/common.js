(function () {

  var logger = window.debug;

  logger.debug("Loading common module.");

  var app = angular.module('common', [
    'common.color.picker',
    'common.calendar.directives',
    'common.form.directives',
    'common.form.field.directives',
    'common.form.controllers',
    'common.routing.directives',
    'common.formatting.filters',
    'common.hammer.directives',
    'common.io.interceptors',
    'common.layout.directives',
    'common.security'
  ]);

  logger.debug("Common module loaded.");

}());
