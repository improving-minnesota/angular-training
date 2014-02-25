(function () {
  'use strict';

  angular.module('timesheet.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams) {

        $scope.requestTimesheets = function requestTimesheets(page) {
          var query = {
            userId: $stateParams.userId,
            page: page,
            sort: {beginDate: 1}
          };

          $control.page('timesheets', query)
            .then(function (pageConfig) {
              $scope.pageConfig = pageConfig;
            });
        };

        $scope.showDetail = function showDetail (timesheet) {
          $state.go('app.timesheet.detail', {id: timesheet._id, userId: $stateParams.userId});
        };

        $scope.requestTimesheets(1);
      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams, timesheet, timeunits) {
        $scope.timesheet = timesheet;
        $scope.timeunits = timeunits;

        $scope.edit = function edit (timesheet) {
          $state.go('app.timesheet.detail.edit', $stateParams);
        };

        $scope.cancel = function cancel () {
          $state.go('app.timesheet', {userId: $stateParams.userId}, {reload: true});
        };
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