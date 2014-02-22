(function () {
  'use strict';

  angular.module('security.interceptor', [
    'security.retry.queue',
    'security.context'
  ])

  // This http interceptor listens for authentication failures
  .factory('securityInterceptor', function ($q, $injector) {

      return {

        responseError : function (response) {
          // We must use $injector to prevent circular dependency
          var queue = $injector.get('security.retry.queue');

          if (response.status == 401 && response.config.url !== '/api/login' ) {
            return queue.pushRetryFn('unauthorized-server', function retryRequest() {
              return $injector.get('$http')(response.config);
            });
          }
          else if (response.status == 403) {
            return queue.pushRetryFn('access-denied-server', function retryRequest() {
              return $injector.get('$http')(response.config); 
            });
          }

          return $q.when(response);
        }
      };
    }
  )

  .factory('csrfInterceptor', function ($q, $injector) {
  
      return {

        request : function (config) {
          var securityContext = $injector.get('securityContext');
          config.headers['x-csrf-token'] = securityContext.csrf;
          return $q.when(config);
        },

        response : function (response) {
          var securityContext = $injector.get('securityContext');
          securityContext.csrf = response.headers('x-csrf-token') || securityContext.csrf;
          return $q.when(response);
        },

        responseError : function (response) {
          var securityContext = $injector.get('securityContext');
          securityContext.csrf = response.headers('x-csrf-token') || securityContext.csrf;
          return $q.when(response);
        }

      };
    }
  )

  // We have to add the interceptor to the queue as a string because the interceptor 
  // depends upon service instances that are not available in the config block.
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('securityInterceptor');
    $httpProvider.interceptors.push('csrfInterceptor');
  });

}());