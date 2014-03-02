(function () {
  'use strict';

  describe('App', function () {
    describe('Views', function () {

      describe('Navbar', function () {
        beforeEach (function () {
            browser().navigateTo("/");
            sleep(0.5);
        });

        it('be a passing spec', function () {
            expect(element('body').count()).toEqual(1);
        });
      });

      describe('Content', function () {
        beforeEach (function () {
            browser().navigateTo("/");
            sleep(0.5);
        });

        it('be a passing spec', function () {
            expect(element('body').count()).toEqual(1);
        });
      });

    });
  });

}());
