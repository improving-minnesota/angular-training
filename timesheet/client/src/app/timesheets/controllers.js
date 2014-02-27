(function () {
  'use strict';

  angular.module('app.timesheets.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams) {

        $scope.requestTimesheets = function requestTimesheets(page) {
          var query = {
            user_id: $stateParams.user_id,
            page: page,
            sort: {beginDate: 1}
          };

          $control.page('timesheets', query)
            .then(function (pageConfig) {
              $scope.pageConfig = pageConfig;
            });
        };

        $scope.showDetail = function showDetail (timesheet) {
          $state.go('app.timesheets.detail', timesheet);
        };

        $scope.createNew = function createNew() {
          $state.go('app.timesheets.create', $stateParams);
        };

        $scope.requestTimesheets(1);
      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams, timesheet, timeunits) {
        $scope.timesheet = timesheet;
        $scope.timeunits = timeunits;

        $scope.edit = function edit (timesheet) {
          $state.go('app.timesheets.detail.edit', $stateParams);
        };

        $scope.cancel = function cancel () {
          $state.go('app.timesheets', $stateParams, {reload: true});
        };

        $scope.logTime = function logTime() {
          $state.go('app.timesheets.detail.timeunits.create', $stateParams);
        };
      } 
    )

    .controller('TimesheetEditCtrl', 
      function ($scope, $state, $stateParams, $control, notifications) {
        $scope.saveText = $state.current.data.saveText;

        $scope.save = function save () {
          $scope.timesheet.$update()
            .then(function (updated) {
              $scope.timesheet = updated;
              notifications.success("Timesheet: " + $scope.timesheet.name + ", was successfully updated.");
            }, 
            function (err) {
              notifications.error('There was an error updating timesheet : ' + $scope.timesheet.name);
            });
        };

        $scope.cancel = function cancel () {
          $state.go('app.timesheets.detail', $stateParams, {reload: true});
        };
      }
    )

    .controller('TimesheetCreateCtrl', 
      function ($scope, $state, $stateParams, $control, notifications) {
        $scope.saveText = $state.current.data.saveText;
        $scope.timesheet = {};

        $scope.save = function save () {
          var timesheet = angular.extend({user_id: $stateParams.user_id}, $scope.timesheet);

          $control.create('timesheets', timesheet)
            .then(function (created) {
              $state.go('app.timesheets.detail', {user_id: $stateParams.user_id, _id: created._id});
              notifications.success("Timesheet: " + $scope.timesheet.name + ", was successfully created.");
            }, 
            function (err) {
              notifications.error('There was an error creating timesheet : ' + $scope.timesheet.name);
            });
        };

        $scope.cancel = function cancel () {
          $state.go('app.timesheets', $stateParams, {reload: true});
        };
      }
    )

    .controller('TimeunitCtrl', 
      function ($scope, $state, $stateParams, projects) {
        $scope.projects = projects; 

        $scope.cancel = function cancel () {
          $state.go('app.timesheets.detail', $stateParams, {reload: true});
        };
      }
    )

    .controller('TimeunitEditCtrl', 
      function ($scope, $state, $stateParams, notifications) {
        
        $scope.save = function save () {

        };
      }
    )

    .controller('TimeunitCreateCtrl', 
      function ($scope, $state, $stateParams, $control, notifications) {
        $scope.timeunit = {};

        $scope.save = function save () {
          $control.create('timeunits', $scope.timeunit)
            .then(function (created) {
              $state.go('app.timesheets.detail', $stateParams, {reload: true});
              notifications.success("Logged Time for " + created.dateWorked);
            },
            function (err) {
              notifications.error("There was an error logging time.");
            });
        };

      }
    );

}());