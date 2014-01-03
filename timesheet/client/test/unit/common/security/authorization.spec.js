describe('authorization', function() {
  var $rootScope, security, authorization, authentication, queue;
  var securityContextResponse, resolved;
  var expect = chai.expect;

  angular.module('test', []).value('I18N.MESSAGES', {});
  
  beforeEach(
    module(
      'test', 
      'common.security',
      'common.security.authorization', 
      'common.security.authentication',
      'common.security.context',
      'app.resources',
      'app.services',
      'ngResource',
      'assets/templates/common/security/login/index.html'
    ));
  
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    authorization = $injector.get('authorization');
    authentication = $injector.get('authentication');
    securityContext = $injector.get('securityContext');
    queue = $injector.get('security.retry.queue');
    
    securityContextResponse = { authenticated: true, user: { id: '1234567890', email: 'jo@bloggs.com', firstName: 'Jo', lastName: 'Bloggs'} };
    resolved = false;

    spyOn(authentication, 'requestCurrentUser').andCallFake(function() {
      securityContext.user = securityContextResponse.user;
      securityContext.authenticated = securityContextResponse.authenticated;
      var promise = $injector.get('$q').when(securityContext);
      // Trigger a digest to resolve the promise;
      return promise;
    });
  }));

  describe('requireAuthenticatedUser', function() {
    
    it('makes a GET request to current user url', function() {
      expect(securityContext.authenticated).to.be.false;

      authorization.requireAuthenticatedUser().then(function(data) {
        resolved = true;
        expect(securityContext.authenticated).to.be.true;
        expect(securityContext.user.id).to.equal(securityContextResponse.user.id);
      });

      $rootScope.$digest();
      expect(resolved).to.be.true;
    });

    it('adds a new item to the retry queue if not authenticated', function () {
      var resolved = false;
      securityContextResponse = securityContext.reset();
      expect(queue.hasMore()).to.be.false;
      authorization.requireAuthenticatedUser().then(function() {
        resolved = true;
      });
      $rootScope.$digest();
      expect(securityContext.authenticated).to.be.false;
      expect(queue.hasMore()).to.be.true;
      expect(queue.retryReason()).to.equal('unauthenticated-client');
      expect(resolved).to.be.false;
    });

  });

  describe('requireAuthorizedUser', function() {

    it('returns a resolved promise if we are already authorized', function() {
      var userInfo = {authenticated: true, roles : ['cool-permission']};
      authentication.setAuthentication(userInfo);

      expect(authorization.hasAuthorization('cool-permission')).to.be.true;

      authorization.requireAuthorizedUser('cool-permission').then(function() {
        resolved = true;
      });

      $rootScope.$digest();
      expect(securityContext.authenticated).to.be.true;
      expect(securityContext.permissions[0]).to.equal('cool-permission');
      expect(resolved).to.be.true;
    });

    it('adds a new item to the retry queue if not authorized', function() {
      expect(queue.hasMore()).to.be.false;
      authorization.requireAuthorizedUser('really-private').then(function() {
        resolved = true;
      });
      $rootScope.$digest();
      expect(queue.hasMore()).to.be.true;
      expect(queue.retryReason()).to.equal('unauthorized-client');
      expect(resolved).to.be.false;
    });

  });
});
  