/*
 * brief    Manage settings of the application and persists them
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';

//-----------------------------------------------------------------------------

@Injectable()
export class Settings {

	constructor(){}
	
	//-------------------------------------------------------------------------
	
	public getCurrentBackend(){
		return {
			type: 'openhab1',
			url: 'http://home-control:8080/rest',
			username: '',
			passsword: ''
		};
	}
	
	//-------------------------------------------------------------------------

	public getValue(key){
		return '';
	}
}
