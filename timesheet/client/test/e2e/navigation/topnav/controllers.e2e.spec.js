(function () {
  'use strict';

  describe('navigation.topnav.controllers', function () {

    beforeEach (function () {
      browser().navigateTo("/");
      sleep(0.5);
    });

    describe('TopnavController', function () {

        it('be a passing spec', function () {
            expect(element('body').count()).toEqual(1);
        });
    });

  });

}());
