describe('Employees', function () {

  var ptor;

  describe('List', function () {

    beforeEach (function () {
      browser.get("#/app/employees");
      ptor = protractor.getInstance();
    });

    it('be a passing spec', function () {
      var body = by.tagName('body');
      expect(ptor.isElementPresent(body)).toBe(true);
    });
  });
});
