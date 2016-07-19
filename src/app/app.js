/*
 * brief    App initialization
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

const app = angular.module('homeControl', [
	'ngRoute',
	'ngAnimate',
	'ngMessages'
]);/*.config(['$animateProvider', '$compileProvider', '$routeProvider', '$sceDelegateProvider', 'NavigationProvider',
	function($animateProvider, $compileProvider, $routeProvider, $sceDelegateProvider, NavigationProvider){

		// Only animated elements which have the class animation (performance improvement for mobile devices)
		$animateProvider.classNameFilter(/animation|animated/);

		// Whitelists non-http protocols
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto):/);

		// Configure the routes
		NavigationProvider.configureRoute($routeProvider);
	}
]).run(function($rootScope, $location, $q, $window){
	$rootScope.$broadcast('app.initalized');
	Navigation.openWindow('project-overview', 'welcome');
});*/
