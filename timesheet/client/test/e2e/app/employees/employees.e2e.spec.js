(function () {
  'use strict';
  var expect = chai.expect;

  describe('Employees', function () {

    beforeEach (function () {
      browser().navigateTo("/employees");
      sleep(0.5);
    });

    describe('List', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
