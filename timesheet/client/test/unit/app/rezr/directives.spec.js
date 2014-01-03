(function (){
    'use strict';

    var expect = chai.expect;

    describe('tsz.directives', function() {

        beforeEach(function () {
            angular.mock.module('tsz.directives');
        });

        // Sample: 
        // describe('sampleDirective', function () {

        //     var appDirectives, scope, elm;  

        //     beforeEach(module('assets/templates/tsz/sampleDirective.html'));
            
        //     beforeEach(function () {
                
        //         inject(function($rootScope, $compile){
        //             scope = $rootScope.$new();

        //             elm = angular.element(
        //                 '<div class="container">' + 
        //                     '<div sample-directive></div>' +
        //                 '</div>');

        //             $compile(elm)(scope);
        //             scope.$digest();
        //         });
        //     });

        // });
    });
}());