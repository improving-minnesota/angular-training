(function () {
  'use strict';

  var app = angular.module('main', [
    'templates-main',
    'templates-lib',
    'app',
    'security',
    'form.directives',
    'date.filters',
    'progress.interceptors',
    'security.interceptors',
    'notifications.services',
    'ui.select2',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.pagination',
    'ngSanitize',
    'ui.router'
  ]);

  app.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/app/projects");
  })

  .run(function ($log, $state, $rootScope, $stateParams) {
    // putting state into $rootScope so that these services are available in views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $log.info("Application running.");
  });

}());
