angular.module('app.security', [
  'app.security.controllers',
  'ui.router'
])
.config(function ($stateProvider) {

  $stateProvider
    // -------------  Login ----------------
    .state('app.login', {
      url: '/login?redirect',
      templateUrl: 'assets/templates/app/security/login/index.html',
      controller: 'LoginCtrl',
      data: {
        section: 'Please Log In'
      }
    });
});