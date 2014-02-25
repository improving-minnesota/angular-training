(function () {
  'use strict';

  angular.module('timesheet.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestTimesheets = function requestTimesheets(page) {
          var query = {
            userId: securityContext.user._id,
            page: page,
            sort: {beginDate: 1}
          };

          $control.page('timesheets', query)
            .then(function (pageConfig) {
              $scope.pageConfig = pageConfig;
            });
        };

        $scope.requestTimesheets(1);
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