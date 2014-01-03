(function () {
	'use strict';

	var logger = window.debug;
	logger.group("Registering Quickview module");

	var app = angular.module('navigation.quickview', [
    'navigation.quickview.directives',
    'navigation.quickview.controllers',
    'navigation.quickview.services'
  ]);

	logger.debug("Quickview module bootstrapped.");
	logger.groupEnd(); 

}());
