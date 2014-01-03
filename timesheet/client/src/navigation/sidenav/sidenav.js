(function () {
	'use strict';

	var logger = window.debug;
	logger.group("Registering navigation.sidenav module");

	var app = angular.module('navigation.sidenav', [
    'navigation.sidenav.directives', 
    'navigation.sidenav.controllers',
    'navigation.sidenav.services'
  ]);

	logger.debug("navigation.sidenav module bootstrapped.");
	logger.groupEnd(); 

}());
