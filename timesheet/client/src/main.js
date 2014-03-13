angular.module('main', [
  'templates-main',
  'templates-lib',
  'app',
  'form.directives',
  // TODO : add the date filters as a dependency
  'progress.interceptors',
  'security.interceptors',
  'ui.select2',
  'ui.bootstrap.datepicker',
  'ui.bootstrap.pagination',
  'ui.bootstrap.buttons',
  'ngSanitize',
  'ngAnimate',
  'ui.router'
])

.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise("/app/projects");
})

.run(function ($log, $state, $rootScope, $stateParams) {
  // putting state into $rootScope so that these services are available in views
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  
  $log.info("Application running.");
});
