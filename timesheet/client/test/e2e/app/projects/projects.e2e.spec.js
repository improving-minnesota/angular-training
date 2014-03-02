(function () {
  'use strict';
  var expect = chai.expect;

  describe('Projects', function () {

    beforeEach (function () {
      browser().navigateTo("/projects");
      sleep(0.5);
    });

    describe('List', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
