
describe('security', function() {

  var $rootScope, 
    $http, 
    $httpBackend, 
    $state, 
    status, 
    userInfo,
    service,
    securityContext,
    queue;
  
  angular.module('test',[]).constant('I18N.MESSAGES', messages = {});

  beforeEach(
    module(
      'common.security',
      'common.security.service', 
      'common.security.context',
      'test', 
      'stateMock', 
      'assets/templates/common/security/login/index.html',
      'app.resources',
      'app.services',
      'ngResource'
    ));

  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$http_, _$state_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $state = _$state_;

    userInfo = {id: '1234567890', email: 'jo@bloggs.com', firstName: 'Jo', lastName: 'Bloggs', permissions: undefined};
    $httpBackend.when('GET', '/api/login').respond(200, { authenticated: true, user: userInfo }); 
  })); 

  beforeEach(inject(function($injector) {
    service = $injector.get('security');
    securityContext = $injector.get('securityContext');
    queue = $injector.get('security.retry.queue');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $state.ensureAllTransitionsHappened();
  });

  describe('showLogin', function() {

    it('should be a passing spec', function() {
      
    });
  });

});