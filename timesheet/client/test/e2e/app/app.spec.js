describe('App', function () {
  var ptor;

  beforeEach(function () {
    ptor = protractor.getInstance();
  });

  describe('Views', function () {

    describe('Navbar', function () {
      beforeEach (function () {
          browser.get("/");
      });

      it('be a passing spec', function () {  
        var body = by.tagName('body');
        expect(ptor.isElementPresent(body)).toBe(true);
      });
    });

    describe('Content', function () {
      beforeEach (function () {
          browser.get("/");
          
      });

      it('be a passing spec', function () {
        var body = by.tagName('body');
        expect(ptor.isElementPresent(body)).toBe(true);
      });
    });

  });
});
