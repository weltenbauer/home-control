/*
 * brief    OpenhabRestCommunication
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

export default class OpenhabRestCommunication{

	constructor($q){
		this.$q = $q;
	}
}

//-----------------------------------------------------------------------------

OpenhabRestCommunication.$inject = ['$q'];
