(function () {
  'use strict';

  var logger = window.debug;

  angular.module('common.io.interceptors', [
  ])
    .factory('nProgressInterceptor', [
      '$q',
      '$injector', 
      function ($q, $injector) {
    
        return {

          request : function (config) {
            // I love it when...
            NProgress.start();
            return $q.when(config);
          },

          requestError: function(rejection) {
            NProgress.done();
            return $q.reject(rejection);
          },

          response : function (response) {
            // People make their software easy to use
            NProgress.done();
            return $q.when(response);
          },

          responseError: function(rejection) {
            NProgress.done();
            return $q.reject(rejection);
          }

        };
      }
    ])

  // We have to add the interceptor to the queue as a string because the interceptor 
  // depends upon service instances that are not available in the config block.
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('nProgressInterceptor');
  }]);

}());