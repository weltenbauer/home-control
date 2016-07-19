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
		this.settings = null;
	}

	//-------------------------------------------------------------------------

	init(){
		const deferred = this.$q.defer();
		return deferred.promise;
	}

	//-------------------------------------------------------------------------

	getProperty(key){

	}

	//-------------------------------------------------------------------------

	setProperty(key, value){
	}
}

//-----------------------------------------------------------------------------

Settings.$inject = ['$q'];
//register('homeControl').factory('Settings', Settings);