(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('navigation.topnav.controllers', function() {
          
    beforeEach(
      module(
        'navigation.topnav.controllers',
        'navigation.quickview.services',
        'navigation.sidenav.services', 
        'common.security',
        'app.resources',
        'app.services',
        'ngResource'
      ));

    describe('TopnavController', function () {

        beforeEach(function (){
          inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            controller = $controller('TopnavController', {
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
