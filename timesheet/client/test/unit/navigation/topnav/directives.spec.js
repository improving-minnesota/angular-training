(function (){
    'use strict';

    var expect = chai.expect;

    describe('navigation.topnav.directives', function() {

        beforeEach(function () {
            angular.mock.module('navigation.topnav.directives');
        });

        describe('ClickableTitle', function () {

            var appDirectives, scope, elm;  

            // beforeEach(module('assets/templates/topnav/clickableTitle.html'));
            
            // beforeEach(function () {
                
            //     inject(function($rootScope, $compile){
            //         scope = $rootScope.$new();

            //         elm = angular.element(
            //             '<div class="container">' + 
            //                 '<div clickable-title>Click this title.</div>' +
            //             '</div>');

            //         $compile(elm)(scope);
            //         scope.$digest();
            //     });
            // });

            // it('should add a h1 to the element', function() {
            //     var header = elm.find('h1');

            //     expect(header.text()).to.equal('Click this title.');
            // });

        });
    });
}());
