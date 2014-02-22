(function () {
  'use strict';

  var app = angular.module('security', [
    'security.interceptor',
    'security.authorization',
    'security.authentication',
    'security.retry.queue',
    'security.login.controllers',
    'security.context'
  ]);

}());