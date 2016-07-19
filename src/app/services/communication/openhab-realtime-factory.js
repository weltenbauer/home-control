/*
 * brief    Openhab realtime communication
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

export default class OpenhabRealtimeCommunication{

	constructor($q){
		this.$q = $q;
	}
}

//-----------------------------------------------------------------------------

OpenhabRealtimeCommunication.$inject = ['$q'];
