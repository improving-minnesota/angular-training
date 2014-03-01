(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('App', function() {
   
    describe('Controllers', function() {
        
      beforeEach(
        module(
          'app.controllers', 
          'app.resources',
          'ngResource',
          'security.services',
          'authentication.services',
          'stateMock',
          'notifications.services'
        ));

      describe('MainCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("MainCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('AppCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("AppCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });

      describe('NavCtrl', function() {
        it('should be able to instantiate the controller',
          inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
              controller = $controller("NavCtrl", {
                $scope: scope
              });
            
            expect(controller).to.be.ok;
        }));
      });
 
    });
  });
}());
