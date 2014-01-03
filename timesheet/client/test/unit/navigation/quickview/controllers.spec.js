(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('navigation.quickview.controllers', function() {
          
    beforeEach(module('navigation.quickview.controllers'));
    beforeEach(module('navigation.quickview.services'));

    describe('QuickviewController', function () {

        beforeEach(function (){
          inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            controller = $controller('QuickviewController', {
                $scope: scope
            }); 
          });
        });

        afterEach (function () {
            // make sure you clean up any test doubles
        });

        it('should be a passing spec', function () {
            expect(true).to.be.ok;
        });

    });
  });
}());
