(function (){
    'use strict';

    var expect = chai.expect;

    describe('admin.directives', function() {

        beforeEach(function () {
            angular.mock.module('admin.directives');
        });

        // Sample: 
        // describe('sampleDirective', function () {

        //     var appDirectives, scope, elm;  

        //     beforeEach(module('assets/templates/admin/sampleDirective.html'));
            
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