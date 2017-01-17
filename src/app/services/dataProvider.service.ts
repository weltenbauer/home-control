/*
 * brief    Provide access to items in a specific area of the current choosen backend
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';

import { BackendDataModel } from '../logic/models/backendData.model';
import { BaseAdapter } from '../services/adapter/base.adapter';

//-----------------------------------------------------------------------------

@Injectable()
export class DataProvider {

	constructor(public currentAdapter : BaseAdapter){
		this.init();
	}
	
	//-------------------------------------------------------------------------

	public init(){
	
		// Create Promise
		return new Promise((resolve, reject) => {
			
			// Init Adapter
			this.currentAdapter.init().then(() => {
				resolve();
			}).catch((ex) => {
				reject('Error while init backend');
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	public getItems(area : string){
		return new Promise((resolve, reject) => {
			const itemData = this.currentAdapter.getItemData();
			resolve(itemData[area] || null);
		});
	}
}
