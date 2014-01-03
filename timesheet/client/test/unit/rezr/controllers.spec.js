(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('rezr.controllers', function () {

    beforeEach(module('rezr.controllers'));

    describe('RezrController', function () {

      beforeEach(function (){
        inject(function($rootScope, $controller){
          scope = $rootScope.$new();
          controller = $controller('RezrController', {
            $scope: scope
          }); 
        });
      });

      it('should be a passing spec', function () {
        expect(true).to.be.ok;
      });

    });
  });
}());
