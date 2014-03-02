describe('Security', function() {

  var expect = chai.expect;
  var controller, scope;
 
  describe('Controllers', function() {
      
    beforeEach(
      module(
        'app.security.controllers', 
        'ngResource',
        'app.resources',
        'security.services',
        'authentication.services',
        'stateMock',
        'notifications.services'
      ));

    describe('LoginCtrl', function() {
      it('should be able to instantiate the controller',
        inject(function($rootScope, $controller) {
          var scope = $rootScope.$new(),
            controller = $controller("LoginCtrl", {
              $scope: scope
            });
          
          expect(controller).to.be.ok;
      }));
    });

  });
});
