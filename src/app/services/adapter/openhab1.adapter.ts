/*
 * brief    Interface to a OpenHAB 1 REST API
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http } from '@angular/http';
import { BaseAdapter } from './base.adapter';
import { Settings } from '../settings.service';

//-----------------------------------------------------------------------------

export class Openhab1Adapter extends BaseAdapter{

	constructor(http : Http, settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	init(){
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
