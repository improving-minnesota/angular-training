(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('admin.controllers', function () {

    beforeEach(module('admin.controllers'));

    describe('AdminController', function () {

      beforeEach(function (){
        inject(function($rootScope, $controller){
          scope = $rootScope.$new();
          controller = $controller('AdminController', {
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
