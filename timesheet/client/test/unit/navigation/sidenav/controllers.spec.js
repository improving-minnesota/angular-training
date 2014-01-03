(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('navigation.sidenav.controllers', function() {
          
    beforeEach(module('navigation.sidenav.controllers'));
    beforeEach(module('navigation.sidenav.services'));

    describe('SidenavController', function () {

      beforeEach(function (){
        inject(function($rootScope, $controller){
          scope = $rootScope.$new();
          controller = $controller('SidenavController', {
              $scope: scope
          }); 
        });
      });

      

    });

    describe('SidenavItemController', function () {

      beforeEach(function (){
        inject(function($rootScope, $controller) {
          scope = $rootScope.$new();
          controller = $controller('SidenavItemController', {
              $scope: scope
          }); 
        });
      });

      // it('should respond to the element if it is selected.', function () {
      //   scope.currentUrl = '/test';

      //   expect(scope.isSelected('/test')).to.be.ok;
      // });

      // it('should responde to the element if it is not selected', function () {
      //   scope.currentUrl = '/not/test';

      //   expect(scope.isSelected('/test')).to.not.be.ok;
      // });

    });

  });
}());
