(function () {
  'use strict';
  var expect = chai.expect;

  describe('tsz.controllers', function () {

    beforeEach (function () {
      browser().navigateTo("/");
      sleep(0.5);
    });

    describe('tszController', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
