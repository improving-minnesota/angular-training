(function () {
    'use strict';

    describe('App', function () {

        describe('Directives', function () {

            describe('ClickableTitle', function () {

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
