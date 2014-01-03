(function () {
  'use strict';

  var logger = window.debug;

  angular.module('security.service', [
    'security.context'         
  ])

    .factory('security', [
      'securityContext',
      function(securityContext) {

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
