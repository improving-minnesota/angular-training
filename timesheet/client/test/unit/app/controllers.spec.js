(function () {
  'use strict';

  var expect = chai.expect;
  var controller, scope;

  describe('App', function() {
   
      describe('Controllers', function() {
          
        beforeEach(
          module(
            'app.controllers', 
            'navigation.sidenav', 
            'navigation.quickview', 
            'app.resources',
            'app.services',
            'ngResource'
          ));

        describe('MainController', function() {
          it('should have the main controller in the app.controllers module',
            inject(function($rootScope, $controller, sidenavSharedEventService, quickviewSharedEventService) {
                var scope = $rootScope.$new(),
                    controller = $controller("MainController", {
                      $scope: scope,
                      sidenavSharedEventService: sidenavSharedEventService,
                      quickviewSharedEventService: quickviewSharedEventService
                    });
                
                expect(controller).to.be.ok;
          }));
        });
   
      });
  });
}());
