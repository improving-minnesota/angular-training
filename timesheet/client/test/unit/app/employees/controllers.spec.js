(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('Employees', function () {
   
    describe('Controllers', function () {
        
      beforeEach(
        module(
          'app.employees.controllers', 
          'app.resources',
          'ngResource',
          'security',
          'stateMock',
          'notifications.services'
        ));

      describe('EmployeeCtrl', function () {
        it('should have the main controller in the app.controllers module',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("EmployeeCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('EmployeeDetailCtrl', function () {
        var employee;

        beforeEach(function () {
          employee = {
            "username": "test", 
            "email": "test@test.com", 
            "password": "password", 
            "admin": true, 
            "firstName": "Test", 
            "lastName": "User"
          };
        });

        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("EmployeeDetailCtrl", {
                $scope: scope,
                employee: employee
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('EmployeeCreateCtrl', function () {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("EmployeeCreateCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });
 
    });
  });
}());
