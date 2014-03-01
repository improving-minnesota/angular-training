(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('Projects', function() {
   
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
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("ProjectCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
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

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("ProjectDetailCtrl", {
                $scope: scope,
                project: project
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('ProjectCreateCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("ProjectCreateCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });
 
    });
  });
}());
