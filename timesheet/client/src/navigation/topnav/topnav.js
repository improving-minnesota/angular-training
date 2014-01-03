(function () {
	'use strict';

	var logger = window.debug;
	logger.group("Registering Navigation Topnav module");

	var app = angular.module('navigation.topnav', [
    'navigation.topnav.directives',
    'navigation.topnav.controllers',
    'navigation.topnav.services'
]);

	logger.debug("Navigation Topnav module bootstrapped.");
	logger.groupEnd(); 

}());
