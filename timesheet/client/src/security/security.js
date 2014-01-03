(function () {
  'use strict';

  var logger = window.debug;

  // Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
  var app = angular.module('security', [
    'security.service',
    'security.interceptor',
    'security.authorization',
    'security.authentication',
    'security.retry.queue',
    'security.login.controllers',
    'security.context',
    'ui.router'
  ]);

  app.config(['$stateProvider', function ($stateProvider){

    $stateProvider
      .state('login', {
        url: '/login?redirect',
        templateUrl: 'assets/templates/security/login/index.html',
        controller: 'LoginFormController',
        data: {
          title: "Please Login",
          section: ""
        }
      });

  }]);

}());