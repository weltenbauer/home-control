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

	public getSetting(key){
		return 'openhab1';
	}
}
