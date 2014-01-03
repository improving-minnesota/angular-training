(function (){
    'use strict';

    var expect = chai.expect;

    describe('navigation.sidenav.directives', function () {
        var scope, elm, ctrl; 

        beforeEach(function () {
            angular.mock.module('navigation.sidenav.controllers', 'navigation.sidenav.directives', 'navigation.sidenav.services');
        });

        beforeEach(module('assets/templates/navigation/sidenav/sidenav.html'));
        beforeEach(module('assets/templates/navigation/sidenav/item.html'));
        beforeEach(module('assets/templates/navigation/sidenav/collection.html'));

        beforeEach(function () {
                
            inject(function($rootScope, $compile){
                scope = $rootScope.$new();

                elm = angular.element(
                    '<div class="container">' + 
                        '<div sidenav items="items"></div>' +
                    '</div>');

                $compile(elm)(scope);
                scope.$digest();

                scope.items = [
                    {
                        href: 'some/test/link',
                        target: 'test-target',
                        icon: 'test',
                        title: 'Nested Item',
                        subitems: [
                            {
                                href: 'single/one/link',
                                title: 'Single One'
                            },
                            {
                                href: 'single/two/link',
                                title: 'Single Two'
                            }
                        ]
                    }
                ];

                scope.$apply();
            });
        });

    //These can't be tested because of security (needs a revisit)

        // describe('sidenav', function () {

        //     it('should add a collection element where appropriate', function () {
        //         var target = elm.find('#test-target');

        //         expect(target.length).to.equal(1);
        //     });
        // });

        // describe('sidenavCollection', function () {

        //     it('should add item and sub-item elements from the scope.', function () {
        //         var itemList = elm.find('.d3-sidenav-item');
        //         expect(itemList.length).to.equal(3);

        //         var titles = _.map(itemList, function (itemElm) { 
        //             var span = angular.element(itemElm).find('span');
        //             return span.text();
        //         });

        //         expect(titles).to.contain('Nested ItemSingle OneSingle Two'); // nested spans
        //         expect(titles).to.contain('Single One');
        //         expect(titles).to.contain('Single Two');
        //     });
        // });

        // describe('sidenavItem', function () {

        //     it('should add an icon to the element', function () {
        //         var icon = elm.find('i');
        //         expect(icon.length).to.equal(1);
        //     });

        //     it('should add a data-toggle attr to an item with sub-itmes', function() {
        //         var item = elm.find('a[data-toggle="collapse"]');
        //         expect(item.length).to.equal(1);
        //         expect(item.text()).to.contain('Nested Item');
        //     });

        //     it('should add a data-target attr to an item with sub-itmes', function() {
        //         var item = elm.find('a[data-target="#test-target"]');
        //         expect(item.length).to.equal(1);
        //         expect(item.text()).to.contain('Nested Item');
        //     });

        // });
    });
}());
