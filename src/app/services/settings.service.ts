/*
 * brief    Manage settings of the application and persists them
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';


import { BackendData } from '../logic/models/backendData.model';

//-----------------------------------------------------------------------------

@Injectable()
export class Settings {

	constructor(){}
	
	//-------------------------------------------------------------------------
	
	public getCurrentBackend(){
	
		const backendData = new BackendData();
		backendData.name = 'Home-Control';
		backendData.type = 'openhab1';
		backendData.url = 'http://home-control:8080/rest';
		backendData.username = '';
		backendData.password = '';
	
		return backendData;
	}
	
	//-------------------------------------------------------------------------

	public getValue(key){
		return '';
	}
}
