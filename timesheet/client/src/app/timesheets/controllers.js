(function () {
  'use strict';

  angular.module('timesheet.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestTimesheets = function requestTimesheets() {
          $control.list('timesheets', {userId: securityContext.user._id})
            .then(function (timesheets) {
              $scope.timesheets = timesheets;
            });
        };

        $scope.requestTimesheets();

        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.maxSize = 5;
        
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };

        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetEditCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetCreateCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    );

}());