/*
 * brief    Provide mock data for development and testing
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

export class MockAdapter extends BaseAdapter{

	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	init(backendData : BackendData){
		return Promise.resolve();
	}
	
	//-------------------------------------------------------------------------
	
	getPages(){
		return {
			'main': {
				label: 'Main',
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
