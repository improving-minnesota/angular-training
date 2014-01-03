(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.topnav.controllers', [
    'common.security.service'
  ])
    .controller('TopnavController', [
      'sidenavSharedEventService',
      'securityContext',
      'authorization',
      '$scope',
      function (sidenavSharedEventService, securityContext, authorization, $scope){

        //Selected quickview id
        $scope.selected = "";

        //Regular link items
        $scope.linkItems = [
          {
            icon: 'user',
            title: 'Profile',
            dropdown: [
              {
                href: '#/user/profile',
                icon: 'user',
                title: 'Profile'
              },
              {
                click: 'logout',
                icon: 'off',
                title: 'Logout'
              }
            ]
          }
        ];  

        $scope.sideNavOpen = sidenavSharedEventService.isActivated();

        $scope.getUser = function getUser() {
          var user = securityContext.user;
          user.authenticated = securityContext.authenticated;
          return user;
        };

        $scope.expandSideClicked = function() {
          sidenavSharedEventService.toggle();
        };

        $scope.$on('sidenavService.activate', function() {
          $scope.sideNavOpen = true;
        });

        $scope.$on('sidenavService.deactivate', function() {
          $scope.sideNavOpen = false;
        });
      }
    ])

    .controller('TopnavLinkItemController', [
      '$scope',
      'authorization',
      function ($scope, authorization) {

        authorization.requireAuthenticatedUser().then(function () {
          $scope.showLinkItem = true;
        });
      }
    ]);

    logger.debug('Registered navigation.topnav.TopnavController');

}());
