describe('Form directives', function () {
  
  var expect = chai.expect;

  var element, 
    $scope,
    $compile,
    $httpBackend;

  beforeEach(module(
    'form.directives',
    'ngResource',
    'assets/templates/common/form/form-header.html',
    'assets/templates/common/form/fields/field-wrapper.html',
    'assets/templates/common/form/fields/static-field.html'
  ));

  beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_, $injector) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  describe('tszFormSectionHeader', function () {

    beforeEach(function () {
      element = angular.element('<div tsz-form-section-header></div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    it('should be a passing spec', function () {
      expect(true).to.be.true;
    });
  });

  describe('tszFieldWrap', function () {

    beforeEach(function () {
      element = angular.element('<div tsz-field-wrap></div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    it('should be a passing spec', function () {
      expect(true).to.be.true;
    });
  });

  describe('tszStaticField', function () {
    beforeEach(function () {
      element = angular.element('<div tsz-static-field></div>');

      $compile(element)($scope);

      $scope.$digest();
      $scope.$apply();
    });

    it('should be a passing spec', function () {
      expect(true).to.be.true;
    });
  });
});