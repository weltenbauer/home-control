/*
 * brief    App initialization
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

// Import factories and services
import register from 'utils/register';
import Settings from 'services/misc/settings-factory';
import OpenhabRestCommunication from 'services/communication/openhab-rest-factory';
import OpenhabRealtimeCommunication from 'services/communication/openhab-realtime-factory';

//-----------------------------------------------------------------------------

const appName = 'homeControl';

//-----------------------------------------------------------------------------

// Init App
const app = angular.module(appName, [
	'ngRoute',
	'ngAnimate',
	'ngMessages'
]).config(['$animateProvider', '$compileProvider', function($animateProvider, $compileProvider){

	// Only animated elements which have the class animation (performance improvement for mobile devices)
	$animateProvider.classNameFilter(/animation|animated/);

	// Whitelists non-http protocols
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto):/);

}]).run(function($rootScope, $q, Settings){
	Settings.init();
	$rootScope.$broadcast('app.initalized');
});

//-----------------------------------------------------------------------------

// Register factories and services
register(appName).factory('Settings', Settings);
register(appName).factory('OpenhabRestCommunication', OpenhabRestCommunication);
register(appName).factory('OpenhabRealtimeCommunication', OpenhabRealtimeCommunication);
