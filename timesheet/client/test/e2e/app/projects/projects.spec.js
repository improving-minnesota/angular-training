describe('Projects', function () {
  var ptor;

  beforeEach (function () {
    browser.get("#/app/projects");
    ptor = protractor.getInstance();
  });

  describe('List', function () {

    it('be a passing spec', function () {
      var body = by.tagName('body');
      expect(ptor.isElementPresent(body)).toBe(true);
    });
  });
});