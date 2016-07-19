/*
 * brief    App initialization
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

// Import factories and services
import Settings from 'services/misc/settings-factory';
import OpenhabRestCommunication from 'services/communication/openhab-rest-factory';
import OpenhabRealtimeCommunication from 'services/communication/openhab-realtime-factory';

//-----------------------------------------------------------------------------

// Init App
const app = angular.module('homeControl', [
	'ngRoute',
	'ngAnimate',
	'ngMessages'
]).config(['$animateProvider', '$compileProvider', function($animateProvider, $compileProvider){

	// Only animated elements which have the class animation (performance improvement for mobile devices)
	$animateProvider.classNameFilter(/animation|animated/);

	// Whitelists non-http protocols
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto):/);

}]).run(function($rootScope, $q){
	//Settings.init();
	$rootScope.$broadcast('app.initalized');
});

//-----------------------------------------------------------------------------

// Register factories and services
app.factory('Settings', Settings);
app.factory('OpenhabRestCommunication', OpenhabRestCommunication);
app.factory('OpenhabRealtimeCommunication', OpenhabRealtimeCommunication);
