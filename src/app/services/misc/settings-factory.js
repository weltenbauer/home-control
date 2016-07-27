/*
 * brief    Manage global application settings
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

export default class Settings{

	constructor($q){
		this.$q = $q;
		this.settings = {
			url: 'http://home-control:8080',
			username: 'christian',
			password: 'secret'
		};
	}

	//-------------------------------------------------------------------------

	getProperty(key){
		return this.settings[key];
	}

	//-------------------------------------------------------------------------

	setProperty(key, value){
		this.settings[key] = value;
		this.save();
	}

	//-------------------------------------------------------------------------

	save(){

	}

	//-------------------------------------------------------------------------

	isAppInitalized(){
		return false;
	}
}

//-----------------------------------------------------------------------------

Settings.$inject = ['$q'];
