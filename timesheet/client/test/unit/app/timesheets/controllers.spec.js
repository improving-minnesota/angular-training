(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('Timesheets', function() {
   
    describe('Controllers', function() {
        
      beforeEach(
        module(
          'app.timesheets.controllers', 
          'app.resources',
          'ngResource',
          'security',
          'stateMock',
          'notifications.services'
        ));

      describe('TimesheetCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimesheetCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('TimesheetDetailCtrl', function() {
        var timesheet,
          timeunits;

        beforeEach(function () {
          timesheet = {
            "name": "TestTimesheet",
            "beginDate": "2013-11-18",
            "endDate": "2013-11-24",
            "description": "Test timesheet for testing"
          };

          timeunits = [
            {"dateWorked": "2013-11-18", "hoursWorked": 8, "project": "Project1"},
            {"dateWorked": "2013-11-19", "hoursWorked": 8, "project": "Project1"},
            {"dateWorked": "2013-11-20", "hoursWorked": 8, "project": "Project1"},
            {"dateWorked": "2013-11-21", "hoursWorked": 8, "project": "Project2"},
            {"dateWorked": "2013-11-22", "hoursWorked": 8, "project": "Project1"}
          ];
        });

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimesheetDetailCtrl", {
                $scope: scope,
                timesheet: timesheet,
                timeunits: timeunits
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('TimesheetEditCtrl', function() {
        var timesheet;

        beforeEach(function () {
          timesheet = {
            "name": "TestTimesheet",
            "beginDate": "2013-11-18",
            "endDate": "2013-11-24",
            "description": "Test timesheet for testing"
          };
        });

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimesheetEditCtrl", {
                $scope: scope,
                timesheet: timesheet
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('TimesheetCreateCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimesheetCreateCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });
 
    });
  });
}());
