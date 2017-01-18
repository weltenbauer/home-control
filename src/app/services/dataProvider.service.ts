/*
 * brief    Provide access to items in a specific area of the current choosen backend
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Settings } from './settings.service';
import { BackendData } from '../logic/models/backendData.model';
import { BaseAdapter } from '../logic/adapter/base.adapter';

import { adapterRegistry } from '../data/adapterRegistry';

//-----------------------------------------------------------------------------

@Injectable()
export class DataProvider {

	private currentAdapter : BaseAdapter = null;

	//-------------------------------------------------------------------------

	constructor(private http : Http, private settings : Settings){
		this.init();
	}
	
	//-------------------------------------------------------------------------

	public init(){
	
		// Get current backendData
		const backendData = this.settings.getCurrentBackend();
	
		// Create Adapter
		this.currentAdapter = this.createAdapter(backendData);
	
		// Create Promise
		return new Promise((resolve, reject) => {
			
			// Init Adapter
			this.currentAdapter.init(backendData).then(() => {
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
	
	//-------------------------------------------------------------------------
	
	private createAdapter(backendData : BackendData){
		const adapterType = adapterRegistry[backendData.type] || null;	
		return adapterType ? new adapterType.type(this.http, this.settings) : null;
	}
}
