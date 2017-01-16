/*
 * brief    Provide mock data for development and testing
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { BaseAdapter } from './base.adapter';
import { BackendDataModel } from '../models/backendData.model';

//-----------------------------------------------------------------------------

export class MockAdapter extends BaseAdapter{

	init(backendData : BackendDataModel){
		return Promise.resolve();
	}
	
	//-------------------------------------------------------------------------
	
	getItemData(){
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
