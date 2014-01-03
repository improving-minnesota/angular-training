(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering navigation.pagination.services");

  angular.module('navigation.pagination.services', [])
    .factory('paginationService', [
      '$rootScope',
      function ($rootScope) {
        
        return {

        };
      }
    ]);

}());
