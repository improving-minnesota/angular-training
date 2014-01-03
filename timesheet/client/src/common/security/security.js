(function () {
  'use strict';

  var logger = window.debug;

  // Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
  var app = angular.module('common.security', [
    'common.security.service',
    'common.security.interceptor',
    'common.security.authorization',
    'common.security.authentication',
    'common.security.retry.queue',
    'common.security.login.controllers',
    'common.security.context',
    'ui.router'
  ]);

  app.config(['$stateProvider', function ($stateProvider){

    $stateProvider
      .state('login', {
        url: '/login?redirect',
        templateUrl: 'assets/templates/common/security/login/index.html',
        controller: 'LoginFormController',
        data: {
          title: "Please Login",
          section: ""
        }
      });

  }]);

}());