(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering navigation.sidenav.services");

  angular.module('navigation.sidenav.services', [])
    .factory('sidenavSharedEventService', [
      '$rootScope',
      function ($rootScope) {
        var sidenavService = {};

        var activated = false;

        sidenavService.isActivated = function() {
          return activated;
        };

        sidenavService.activate = function() {
          $rootScope.$broadcast('sidenavService.activate');
          activated = true;
        };

        sidenavService.deactivate = function() {
          $rootScope.$broadcast('sidenavService.deactivate');
          activated = false;
        };
        sidenavService.toggle = function() {
          if (!activated) {
            sidenavService.activate();
          } else {
            sidenavService.deactivate();
          }
        };

        return sidenavService;
      }
    ]);

}());