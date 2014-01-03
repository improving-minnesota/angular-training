(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering quickview.services");

  angular.module('navigation.quickview.services', ['common.security'])
    .factory('quickviewSharedEventService', [
      '$rootScope',
      function ($rootScope) {
        var eventService = {};

        var activated = false,
          views = ['alerts', 'events', 'inbox'],
          viewIndex = 0;

        eventService.isActivated = function() {
          return activated;
        };

        eventService.getView = function() {
          return views[viewIndex];
        };

        eventService.getViews = function() {
          return views;
        };

        eventService.getViewIndex = function() {
          return viewIndex;
        };

        eventService.activate = function(index) {
          activated = true;
          if (index) {
            viewIndex = _.indexOf(views, index);
          }
          $rootScope.$broadcast('quickview.activate');
        };

        eventService.next = function() {
          if (activated) {
            if (viewIndex === views.length - 1) {
              viewIndex = 0;
            } else {
              viewIndex++;
            }
            $rootScope.$broadcast('quickview.activate');
          }
        };

        eventService.deactivate = function() {
          activated = false;
          viewIndex = 0;
          $rootScope.$broadcast('quickview.deactivate');     
        };

        return eventService;
      }
    ]);

}());
