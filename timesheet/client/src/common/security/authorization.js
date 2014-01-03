(function () {
  'use strict';

  var logger = window.debug;

  angular.module('common.security.authorization', [
    'common.security.retry.queue',
    'common.security.authentication'
  ])

  // This service provides guard methods to protect application states.
  // You can add them as resolves to states to require authorization levels
  // before allowing a state change to complete
  .provider('authorization', {

    requireAuthenticatedUser: [
      'authorization',
      function(authorization) {
        return authorization.requireAuthenticatedUser();
      }
    ],

    requireAuthorizedUser: function (permission) {
      return [
        'authorization',
        function(authorization) {
          return authorization.requireAuthorizedUser(permission);
        }
      ];
    },

    requireInstitutionContext: [
      'authorization',
      function(authorization) {
        return authorization.requireInstitutionContext();
      }
    ],

    $get: [
      '$q',
      '$injector',
      'authentication',
      'securityContext',
      function($q, $injector, authentication, securityContext) {
        var service = {

          // Require that there is an authenticated user
          // (use this in a state resolve to prevent non-authenticated users from entering that state)
          requireAuthenticatedUser: function() {
            var queue = $injector.get('security.retry.queue');

            var promise = authentication.requestCurrentUser().then(function(userInfo) {
              if ( !securityContext.authenticated ) {
                return queue.pushRetryFn('unauthenticated-client', function() {
                  return service.requireAuthenticatedUser();
                });
              }
            });
            return promise;
          },

          requireAuthorizedUser: function (authorization) {
            var queue = $injector.get('security.retry.queue');

            var promise = authentication.requestCurrentUser().then(function(userInfo) {
              if ( !service.hasAuthorization(authorization) ) {
                return queue.pushRetryFn('unauthorized-client', service.requireAuthorizedUser);
              }
            });
            return promise;
          },

          hasAuthorization : function (authorization) {
            var auth = _.find(securityContext.permissions, function(permission) {
              return permission === authorization;
            });

            return !!auth;
          }

        };

        return service;
      }
    ]
  });

}());