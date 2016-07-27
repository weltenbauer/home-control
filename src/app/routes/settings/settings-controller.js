/*
 * brief    SettingsController
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

export default class SettingsController{

	constructor($q, Settings){
		this.$q = $q;
		this.settings = Settings;

		// Get stored settings
		this.url = this.settings.getProperty('url');
		this.username = this.settings.getProperty('username');
		this.password = this.settings.getProperty('password');
		this.currentSitemap = this.settings.getProperty('currentSitemap');
	}

	//-------------------------------------------------------------------------

	connect(){

		// Save settings
		this.settings.setProperty('url', this.url);
		this.settings.setProperty('username', this.username);
		this.settings.setProperty('password', this.password);
	}

	//-------------------------------------------------------------------------

	setSitemap(){
		this.settings.setProperty('currentSitemap', this.currentSitemap);
	}
}

//-----------------------------------------------------------------------------

SettingsController.$inject = ['$q', 'Settings'];
