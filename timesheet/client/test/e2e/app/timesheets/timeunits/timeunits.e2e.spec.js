(function () {
  'use strict';
  var expect = chai.expect;

  describe('Timeunits', function () {

    beforeEach (function () {
      browser().navigateTo("/timesheets/1/timeunits");
      sleep(0.5);
    });

    describe('List', function () {

      it('be a passing spec', function () {
        expect(true).to.be.ok;
      });
    });
  });
}());
