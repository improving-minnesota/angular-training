(function () {
  'use strict';

  angular.module('app.timesheets.controllers', [])

    .controller('TimesheetCtrl', 
      function ($control, $scope, $state, $stateParams, notifications) {

        $scope.requestTimesheets = function requestTimesheets (page) {

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

        $scope.createNew = function createNew () {
          $state.go('app.timesheets.create', $stateParams);
        };

        $scope.remove = function remove (timesheet) {
          var deleted = angular.extend(timesheet, {deleted: true});

          $control.remove('timesheets', deleted)
            .then(function () {
              notifications.success('Timesheet deleted.');
            },
            function (err) {  
              notifications.error('Error deleting timesheet : ' + err); 
            });
        };

        $scope.restore = function restore (timesheet) {
          var deleted = angular.extend(timesheet, {deleted: false, previous_id: timesheet._id});
          delete deleted._id;

          $control.create('timesheets', deleted)
            .then(function (restored) {
              notifications.success('Timesheet restored.');
              timesheet._id = restored._id;
            }, 
            function (err) {
              notifications.error('Error restoring timesheet: ' + err);
            });
        };

        $scope.requestTimesheets(1);
      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams, $control, notifications, timesheet, timeunits) {
        $scope.timesheet = timesheet;
        $scope.timeunits = timeunits;

        $scope.edit = function edit (timesheet) {
          $state.go('app.timesheets.detail.edit', $stateParams);
        };

        $scope.cancel = function cancel () {
          $state.go('app.timesheets', $stateParams, {reload: true});
        };

        $scope.logTime = function logTime () {
          $state.go('app.timesheets.detail.timeunits.create', $stateParams);
        };

        $scope.showTimeUnitDetail = function showTimeUnitDetail (timeunitId) {
          $stateParams.timeunit_id = timeunitId;
          $state.go('app.timesheets.detail.timeunits.edit', $stateParams);
        };

        $scope.removeTimeunit = function removeTimeunit (timeunit) {
          var removed = angular.extend(timeunit, {deleted: true, user_id: $scope.timesheet.user_id});

          $control.remove('timeunits', removed) 
            .then(function () {
              notifications.success('Timeunit deleted.');
            },
            function (err) {
              notifications.error('Timeunit restored.');
            });
        };

        $scope.restoreTimeunit = function restoreTimeunit (timeunit) {
          var restored = angular.extend(timeunit, {deleted: false, user_id: $scope.timesheet.user_id});
          delete restored._id;

          $control.create('timeunits', restored)
            .then(function (restoredTimeunit) {
              notifications.success('Timeunit was restored.');
              timeunit._id = restoredTimeunit._id;
            },
            function (err) {
              notifications.error('Error restoring the timeunit.');
            });
        };
      } 
    )

    .controller('TimesheetEditCtrl', 
      function ($scope, $state, $stateParams, $control, notifications, timesheet) {
        $scope.saveText = $state.current.data.saveText;
        $scope.timesheet = timesheet;

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
      function ($scope, $state, $stateParams, notifications, timeunit) {
        $scope.timeunit = timeunit;
        
        $scope.save = function save () {
          $scope.timeunit.$update()
            .then(function (updated) {
              $scope.timeunit = updated;
              notifications.success('Timeunit updated.');
            },
            function (err) {
              notifications.error('Error updating timeunit.');
              $state.reload();
            });
        };
      }
    )

    .controller('TimeunitCreateCtrl', 
      function ($scope, $state, $stateParams, $control, notifications, dateFilter) {
        $scope.timeunit = {
          user_id: $stateParams.user_id,
          timesheet_id: $stateParams._id
        };

        $scope.save = function save () {

          $control.create('timeunits', $scope.timeunit)
            .then(function (created) {
              $state.go('app.timesheets.detail', $stateParams, {reload: true});
              notifications.success("Logged Time for " + dateFilter(created.dateWorked));
            },
            function (err) {
              notifications.error("There was an error logging time.");
            });
        };

      }
    );

}());