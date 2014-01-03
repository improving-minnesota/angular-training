(function () {
  'use strict';
  var expect = chai.expect;

  describe('admin.controllers', function () {

    beforeEach (function () {
      browser().navigateTo("/");
      sleep(0.5);
    });

    describe('AdminController', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
