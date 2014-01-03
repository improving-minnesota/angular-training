(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('tsz.controllers', function () {

    beforeEach(module('tsz.controllers'));

    describe('tszController', function () {

      beforeEach(function (){
        inject(function($rootScope, $controller){
          scope = $rootScope.$new();
          controller = $controller('tszController', {
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
