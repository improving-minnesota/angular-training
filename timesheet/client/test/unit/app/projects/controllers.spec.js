describe('Projects', function() {

  var expect = chai.expect;
  var controller, 
    scope;
 
  describe('Controllers', function() {
      
    beforeEach(
      module(
        'app.projects.controllers',
        'app.resources',
        'ngResource',
        'security.services',
        'stateMock',
        'notifications.services'
      ));

    describe('ProjectCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller("ProjectCtrl", { 
          $scope: scope 
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () { 
          expect(controller).to.be.ok;
        });
      }); 

    });

    describe('ProjectDetailCtrl', function() {
      var project;

      beforeEach(function () {
        project = {
          "_id": "abcdefghijklmnop",
          "name": "Project2", 
          "description": "This is your second project"
        };
      });

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("ProjectDetailCtrl", {
            $scope: scope,
            project: project
          });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });
      });
    });

    describe('ProjectCreateCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("ProjectCreateCtrl", {
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