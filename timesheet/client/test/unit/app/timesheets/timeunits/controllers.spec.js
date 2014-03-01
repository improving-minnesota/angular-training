(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('Timeunits', function() {
   
    describe('Controllers', function() {
        
      beforeEach(
        module(
          'app.timesheets.timeunits.controllers', 
          'app.resources',
          'ngResource',
          'security.services',
          'stateMock',
          'notifications.services'
        ));

      describe('TimeunitCtrl', function() {
        var projects;

        beforeEach(function () {
          projects = [
            {"name": "Project1", "description": "This is your first project"}
          ];
        });

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimeunitCtrl", {
                $scope: scope,
                projects: projects
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('TimeunitEditCtrl', function() {
        var timeunit;

        beforeEach(function () {
          timeunit = {"dateWorked": "2013-11-18", "hoursWorked": 8, "project": "Project1"};
        });

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimeunitEditCtrl", {
                $scope: scope,
                timeunit: timeunit
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('TimeunitCreateCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("TimeunitCreateCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });
 
    });
  });
}());
