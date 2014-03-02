describe('Timeunits', function() {

  var expect = chai.expect;
  var controller, scope;
 
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
        projects = [{
          "name": "Project1", 
          "description": "This is your first project"
        }];
      });

      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller("TimeunitCtrl", { 
          $scope: scope,
          projects: projects
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () { 
          expect(controller).to.be.ok;
        });
      }); 
    });

    describe('TimeunitEditCtrl', function() {
      var timeunit;

      beforeEach(function () {
        timeunit = {
          "dateWorked": "2013-11-18", 
          "hoursWorked": 8, 
          "project": "Project1"
        };
      });

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("TimeunitEditCtrl", {
            $scope: scope,
            timeunit: timeunit
          });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });
      });
    });

    describe('TimeunitCreateCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("TimeunitCreateCtrl", {
            $scope: scope
          });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });
      }); 
    });

  });
});