(function () {
  'use strict';

  var app = angular.module('main', [
    'templates-main',
    'templates-lib',
    'app',
    'common',
    'security',
    'navigation.pagenav',
    'navigation.pagination',
    'ui.router',
    'ui.select2',
    'ui.bootstrap.datepicker',
    'ngResource',
    'ngSanitize'
  ]);

  app.config(function ($stateProvider, $httpProvider, $urlRouterProvider, authorizationProvider) {
    $urlRouterProvider.otherwise("/app/timesheets");
  })

  .run(function ($log, $state, $rootScope, $stateParams) {
    // putting state into $rootScope so that these services are available in views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $log.info("Application running.");
  });

}());
