(function () {
  'use strict';

  var logger = window.debug;

  angular.module('app.controllers', [
    'common.hammer.directives',
    'navigation.sidenav.services',
    'navigation.quickview.services'
  ])
    .controller('MainController', [
      '$scope',
      'sidenavSharedEventService',
      'quickviewSharedEventService',
      'authorization',
      function($scope, sidenavSharedEventService, quickviewSharedEventService, authorization) {

        $scope.pushLeft = false;
        $scope.pushRight = false;

        $scope.contentSwipeLeft = function(event) {
          //On swipe left, if the side nav is open
          if (sidenavSharedEventService.isActivated()) {
            //Close it
            sidenavSharedEventService.deactivate();
          }
          //Otherwise, if the quickview is closed, open it
          else if(!quickviewSharedEventService.isActivated()) {
            quickviewSharedEventService.activate();
          }

          else if(quickviewSharedEventService.isActivated()) {
            quickviewSharedEventService.next();
          }
        };

        $scope.contentSwipeRight = function(event) {
          //On swipe right, if the quickview is open
          if(quickviewSharedEventService.isActivated()) {
            //Close it
            quickviewSharedEventService.deactivate();

          //Otherwise, if the sidenav is closed, open it
          } else if (!sidenavSharedEventService.isActivated()) {
            sidenavSharedEventService.activate();
          }
        };

        $scope.$on('quickview.activate', function() {
          $scope.pushLeft = true;
        }); 

        $scope.$on('quickview.deactivate', function() {
          $scope.pushLeft = false;
        });  

        $scope.$on('sidenavService.activate', function() {
          $scope.pushRight = true;
        }); 

        $scope.$on('sidenavService.deactivate', function() {
          $scope.pushRight = false;
        });

        $scope.authenticatedUser = false;
        authorization.requireAuthenticatedUser().then(function () {
          $scope.authenticatedUser = true;
        });
      }
    ]);

    logger.debug('Registered app.MainController');

}());
