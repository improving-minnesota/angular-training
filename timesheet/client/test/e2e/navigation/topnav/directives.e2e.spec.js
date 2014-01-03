(function () {
    'use strict';

    describe('navigation.topnav.directives', function () {

        beforeEach (function () {
            browser().navigateTo("/");
            sleep(0.5);
        });

        it('be a passing spec', function () {
            expect(element('body').count()).toEqual(1);
        });
    });

}());
