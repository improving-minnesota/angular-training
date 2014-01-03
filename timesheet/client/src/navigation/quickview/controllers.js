(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.quickview.controllers', ['common.routing.directives'])

    .controller('QuickviewController', [
      'quickviewSharedEventService',
      '$scope',
      function (quickviewSharedEventService, $scope){

        $scope.open = false;

        //Triggered from the quicknav service
        $scope.$on('quickview.activate', function() {
          $scope.open = true;
          $scope.view = quickviewSharedEventService.getView();
        });

        //Triggered from the quicknav service
        $scope.$on('quickview.deactivate', function() {
          $scope.open = false;
        });

        $scope.closeQuickNav = function() {
          quickviewSharedEventService.deactivate();
        };
         
      }
    ])

    .controller('QuickviewNavController', [
      '$scope',
      '$location',
      'quickviewSharedEventService',
      function ($scope, $location, quickviewSharedEventService){
        $scope.closeQuickView = function() {
          quickviewSharedEventService.deactivate();
        };

        $scope.viewMore = function(item) {
          var currentView = quickviewSharedEventService.getView();
          $location.path(['system', currentView].join('/'));
          quickviewSharedEventService.deactivate();
        };
      }
    ])

    .controller('QuickviewAlertsController', [
      '$scope',
      '$state',
      'quickviewSharedEventService',
      function ($scope, $state, quickviewSharedEventService){
        
      }
    ])

    .controller('QuickviewEventsController', [
      '$scope',
      '$location',
      'quickviewSharedEventService',
      function ($scope, $location, quickviewSharedEventService){
       
      }
    ])

    .controller('QuickviewInboxController', [
      '$scope',
      '$location',
      'quickviewSharedEventService',
      function ($scope, $location, quickviewSharedEventService){
        
      }
    ]);

    logger.debug('Registered quickview.QuickviewController');

}());
