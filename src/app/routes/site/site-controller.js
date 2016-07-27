/*
 * brief    SiteController
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

export default class SiteController{

	constructor($q){
		this.$q = $q;
	}
}

//-----------------------------------------------------------------------------

SiteController.$inject = ['$q'];
