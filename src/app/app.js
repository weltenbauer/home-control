/*
 * brief    App initialization
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

const appName = 'homeControl';

//-----------------------------------------------------------------------------

// Init App
const app = angular.module(appName, [
	'ngRoute',
	'ngAnimate',
	'ngMessages'
]).config(['$animateProvider', '$compileProvider', '$routeProvider', function($animateProvider, $compileProvider, $routeProvider){

	// Only animated elements which have the class animation (performance improvement for mobile devices)
	$animateProvider.classNameFilter(/animation|animated/);

	// Whitelists non-http protocols
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto):/);

	// Configure the routes
	$routeProvider
		.when('/site/:siteId', {
			templateUrl: 'app/routes/site/site.html',
			controller: 'SiteController as siteController'
		})
		.when('/settings', {
			templateUrl: 'app/routes/settings/settings.html',
			controller: 'SettingsController as settingsController'
		})
		.when('/info', {
			templateUrl: 'app/routes/info/info.html',
			controller: 'InfoController as infoController'
		})
		.otherwise({
			redirectTo: '/site'
		});

}]).run(function($rootScope, $q, Settings){
	$rootScope.$broadcast('app.initalized');
});

//-----------------------------------------------------------------------------

// Import factories and services
import register from 'utils/register';
import Settings from 'services/misc/settings-factory';
import OpenhabRestCommunication from 'services/communication/openhab-rest-factory';
import OpenhabRealtimeCommunication from 'services/communication/openhab-realtime-factory';
import SiteController from 'routes/site/site-controller';
import SettingsController from 'routes/settings/settings-controller';
import InfoController from 'routes/info/info-controller';

//-----------------------------------------------------------------------------

// Register factories and services
register(appName).factory('Settings', Settings);
register(appName).factory('OpenhabRestCommunication', OpenhabRestCommunication);
register(appName).factory('OpenhabRealtimeCommunication', OpenhabRealtimeCommunication);
register(appName).controller('SiteController', SiteController);
register(appName).controller('SettingsController', SettingsController);
register(appName).controller('InfoController', InfoController);
