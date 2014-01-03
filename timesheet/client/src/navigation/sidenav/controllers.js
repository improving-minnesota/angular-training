(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.sidenav.controllers', [
    'ui.router',
    'common.security.service'
  ])
    .controller('SidenavController', [
      '$scope',
      'securityContext',
      'authorization',
      '$control',
      function ($scope, securityContext, authorization, $control) {

        $scope.open = false;

        $scope.$on('sidenavService.activate', function() {
          $scope.open = true;
        });

        $scope.$on('sidenavService.deactivate', function() {
          $scope.open = false;
        });

        authorization.requireAuthenticatedUser().then(function (user) {
          $scope.items = [
            { 'state': 'rezr', 'icon': 'dashboard', 'title': 'Reservations', 'position': 1,
              'subitems': [
                {'state': 'rezr.dashboard', 'title': 'Dashboard', 'position': 1},
                {'state': 'rezr.timeslots', 'title': 'Reserve a Time Slot', 'position': 2},
                {'state': 'rezr.admin', 'title': 'Admin Reservations', 'position': 3}
              ]
            },
            { 'state': 'admin', 'icon': 'cogs', 'title': 'Administration', 'position': 2,
              'subitems': [
                { 'state': 'admin.seasons', 'title': 'Season', 'position': 1},
                { 'state': 'admin.timeslots', 'title': 'Time Slots', 'position': 2},
                { 'state': 'admin.properties', 'title': 'Vacation Properties', 'position': 3}
              ]
            }
          ];

        });
      }
    ])

    .controller('SidenavItemController', [
      '$scope', 
      '$state',
      'sidenavSharedEventService',
      function ($scope, $state, sidenavSharedEventService) {

        $scope.setView = function(stateName) {
          $state.go(stateName);
          if ($scope.item.subitems && angular.isArray($scope.item.subitems) && $scope.item.subitems.length === 0) {
            sidenavSharedEventService.deactivate();
          }     
        };

        $scope.isInState = function() {
          if ($scope.item.includeMatchState) {
            logger.debug($scope.inState, $scope.item.includeMatchState);
            $scope.inState = $state.includes($scope.item.includeMatchState);
          } else {
            $scope.inState = $state.includes($scope.item.state);
          }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
          $scope.isInState();
        }); 

        $scope.isInState();
      }
    ])

    .controller('SidenavCollectionController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.isInState = function() {
          $scope.inState = $state.includes($scope.state);
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
          $scope.isInState();
        }); 

        $scope.$watch('inState', function(newValue) {
          if (newValue) {
            $scope.isOpen = true;
          } else {
            $scope.isOpen = false;
          }
        });

        $scope.isInState();
      }
    ]);

    logger.debug('Registered navigation.sidenav.controllers');
}());
