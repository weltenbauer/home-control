/*
 * brief    Provide access to items in a specific area of the current choosen backend
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';

import { BackendDataModel } from '../logic/models/backendData.model';

import { BaseAdapter } from '../logic/adapter/base.adapter';
import { MockAdapter } from '../logic/adapter/mock.adapter';
import { Openhab1Adapter } from '../logic/adapter/openhab1.adapter';

//-----------------------------------------------------------------------------

@Injectable()
export class DataProviderService {

	private currentAdapter : BaseAdapter = null;
	private items = {};
	
	//-------------------------------------------------------------------------
	
	constructor(){
		this.init(null);
	}
	
	//-------------------------------------------------------------------------

	public init(backendData : BackendDataModel){
	
		// Create Promise
		return new Promise((resolve, reject) => {
			
			// Create new adapter with the given promise data
			this.currentAdapter = this.createAdapter(backendData);
			
			// Init Adapter
			this.currentAdapter.init(backendData).then(() => {
				resolve();
				this.items = this.currentAdapter.getItemData();
			}).catch((ex) => {
				console.log('Error while init backend');
				reject();
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	public getItems(area : string){
		return this.items[area] || null;
	}
	
	//-------------------------------------------------------------------------
	
	private createAdapter(backendData : BackendDataModel){
		return new MockAdapter();
	}
}
