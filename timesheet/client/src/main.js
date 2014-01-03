(function () {

  var logger = window.debug;

  logger.group("Starting application.");
  logger.group("Setup Main module.");

  logger.debug("Setting application dependencies.");

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

  app.value('$strapConfig', {
    datepicker: {
      language: 'en',
      format: 'M d, yyyy'
    }
  });

  logger.group("Loading Routes");

  app.config([
    '$stateProvider', 
    '$httpProvider',
    '$urlRouterProvider', 
    'authorizationProvider', 
    function ($stateProvider, $httpProvider, $urlRouterProvider, authorizationProvider) {
    
      $urlRouterProvider.otherwise("/home");
  }])

  .run(['$state', '$rootScope', '$stateParams', function ($state, $rootScope, $stateParams) {
    // putting state into $rootScope so that these services are available in views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    logger.debug("Application running.");
  }]);

  logger.groupEnd();

  logger.debug("Main module and routes configured.");

  logger.groupEnd();
  logger.groupEnd();

}());
