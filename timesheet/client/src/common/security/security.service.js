(function () {
  'use strict';

  var logger = window.debug;

  angular.module('common.security.service', [
    'common.security.retry.queue',      // Keeps track of failed requests that need to be retried once the user logs in
    'common.security.login.controllers',// Contains the login form template and controller
    'common.security.authentication',   // Provides the login/logout functionality
    'common.security.authorization',    // Provides the permissions analysis
    'ui.router'          
  ])

    .factory('security', [
      '$q', 
      '$state', 
      'security.retry.queue', 
      'authentication', 
      'authorization',
      '$location',
      function($q, $state, queue, authentication, authorization, $location) {

        // The public API of the service
        var service = {

          // Information about the current user
          currentUser: function () {
            return securityContext.user;
          },

          isAuthenticated : function () {
            return securityContext.authenticated;
          },

          // Does the current user have the authorization?
          hasAuthorization: function(permission) {
            //return !!(securityContext.user && authorization.hasAuthorization(permission));
            return true;
          }
        };

        return service;
      }
    ]);

}());
