/*
 * brief    Interface to a OpenHAB 1 REST API
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http } from '@angular/http';
import { BaseAdapter } from './base.adapter';
import { Settings } from '../../services/settings.service';
import { BackendData } from '../models/backendData.model';

//-----------------------------------------------------------------------------

export class Openhab1Adapter extends BaseAdapter{

	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	init(backendData : BackendData){
	
		this.http.get(backendData.url)
			.toPromise()
			.then(response => console.log(response))
			.catch(error => console.log(error));	

		//this.http.get()
	
		return Promise.resolve();
	}
	
	//-------------------------------------------------------------------------
	
	getItemData(){
		return {
			'main': {
				label: 'Main Openhab',
				items: {
					'main.lamp.1': {
						type: 'switch',
						label: 'Lamp 1',
						state: 'on',
						setState: function(state){
							
						}
					}
				}
			}
		};
	}
}
