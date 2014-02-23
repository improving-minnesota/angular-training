(function () {
  'use strict';

  angular.module('security.authorization', [
    'security.retry.queue',
    'security.authentication'
  ])

  // This service provides guard methods to protect application states.
  // You can add them as resolves to states to require authorization levels
  // before allowing a state change to complete
  .provider('authorization', {

    requireAuthenticatedUser: [
      'authorization',
      function (authorization) {
        return authorization.requireAuthenticatedUser();
      }
    ],

    requireAuthorizedUser: function (permission) {
      return [
        'authorization',
        function (authorization) {
          return authorization.requireAuthorizedUser(permission);
        }
      ];
    },

    $get: function ($injector, authentication, securityContext) {
      
      var service = {
        // Require that there is an authenticated user
        // (use this in a state resolve to prevent non-authenticated users from entering that state)
        requireAuthenticatedUser: function () {
          var queue = $injector.get('retryQueue');

          return authentication.requestCurrentUser()
            .then(function (userInfo) {
              if ( !securityContext.authenticated ) {
                return queue.pushRetryFn('unauthenticated-client', function () {
                  return service.requireAuthenticatedUser();
                });
              }
            });
        },

        requireAuthorizedUser: function (authorization) {
          var queue = $injector.get('retryQueue');

          return authentication.requestCurrentUser()
            .then(function (userInfo) {
              if ( !service.hasAuthorization(authorization) ) {
                return queue.pushRetryFn('unauthorized-client', service.requireAuthorizedUser);
              }
            });
        },

        hasAuthorization : function (authorization) {
          var auth = _.find(securityContext.permissions, function (permission) {
            return permission === authorization;
          });

          return !!auth;
        }

      };

      return service;
    }
  });

}());