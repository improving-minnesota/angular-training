(function () {
  'use strict';

  describe('navigation.sidenav.controllers', function () {

    beforeEach (function () {
      browser().navigateTo("/");
      sleep(0.5);
    });

    describe('SidenavController', function () {

        it('be a passing spec', function () {
            expect(element('body').count()).toEqual(1);
        });
    });

  });

}());
