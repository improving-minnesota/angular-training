(function () {
  'use strict';

  angular.module('timesheet.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestTimesheets = function requestTimesheets() {
          var query = angular.extend($scope.pageConfig, {userId: securityContext.user._id});
          $control.list('timesheets', query)
            .then(function (timesheets) {
              $scope.timesheets = timesheets;
            });
        };

        $scope.pageConfig = {
          page: 1,
          limit: 5
        };

        $scope.requestTimesheets();
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