(function () {
  
  'use strict';

  var app = angular.module('app.security', [
    'app.security.controllers',
    'ui.router'
  ]);

  app.config(function ($stateProvider) {

    $stateProvider
      // -------------  Login ----------------
      .state('app.login', {
        url: '/login?redirect',
        templateUrl: 'assets/templates/security/login/index.html',
        controller: 'LoginCtrl',
        data: {
          section: 'Please Log In'
        }
      });
  });

}());
