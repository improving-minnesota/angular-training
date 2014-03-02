describe('Employees', function () {
  var expect = chai.expect;
  var controller, scope;

  describe('Controllers', function () {
      
    beforeEach(
      module(
        'app.employees.controllers', 
        'app.resources',
        'ngResource',
        'security.services',
        'stateMock',
        'notifications.services'
      ));

    describe('EmployeeCtrl', function () {

      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller("EmployeeCtrl", { 
          $scope: scope 
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () { 
          expect(controller).to.be.ok;
        });
      }); 
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

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("EmployeeDetailCtrl", {
            $scope: scope,
            employee: employee
          });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });
      });

    });

    describe('EmployeeCreateCtrl', function () {

      beforeEach(inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
          controller = $controller("EmployeeCreateCtrl", {
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
