(function () {
  'use strict';
  var expect = chai.expect;

  describe('Security', function () {

    beforeEach (function () {
      browser().navigateTo("/login");
      sleep(0.5);
    });

    describe('Login', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
