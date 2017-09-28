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

	public getCurrentBackend(){

		const backendData = new BackendData();

		/*backendData.name = 'Home-Control';
		backendData.type = 'openhab1';
		backendData.url = 'http://home-control:8080/rest';
		backendData.username = '';
		backendData.password = '';
		backendData.metaData = {
			sitemap: 'homecontrol'
		};*/

		/*backendData.name = 'Home-Control';
		backendData.type = 'openhab1';
		backendData.url = 'https://home-control.duckdns.org/rest';
		backendData.username = 'christian';
		backendData.password = 'mlciETnk';
		backendData.metaData = {
			sitemap: 'homecontrol'
		};*/

		backendData.name = 'Home-Control';
		backendData.type = 'mock';

		return backendData;
	}
}
