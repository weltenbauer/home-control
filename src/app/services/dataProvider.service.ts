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
import { Page } from '../logic/models/page.model';
import { BaseAdapter } from '../logic/adapter/base.adapter';

import { adapterRegistry } from '../data/adapterRegistry';

//-----------------------------------------------------------------------------

// State of the provider
export enum DataProviderState {
	Init,
	Ok,
	Error
};

//-----------------------------------------------------------------------------

@Injectable()
export class DataProvider {

	private currentAdapter : BaseAdapter = null;
	
	public state : DataProviderState = DataProviderState.Init;
	public errorDetails : string = '';

	//-------------------------------------------------------------------------

	constructor(private http : Http, private settings : Settings){}
	
	//-------------------------------------------------------------------------

	public init(){
	
		// Set state
		this.state = DataProviderState.Init;
		this.errorDetails = '';
	
		// Get current backendData
		const backendData = this.settings.getCurrentBackend();
	
		// Create Adapter
		this.currentAdapter = this.createAdapter(backendData);
	
		// Create Promise
		return new Promise((resolve, reject) => {
			
			// Init Adapter
			this.currentAdapter.init(backendData).then(() => {
				this.state = DataProviderState.Ok;
				resolve();
			}).catch((error) => {
				this.state = DataProviderState.Error;
				this.errorDetails = error;
				reject(error);
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	public getPage(path : string) : Promise<Page>{
		return new Promise((resolve, reject) => {
			this.currentAdapter.getPages().then((itemData) => {
				resolve(itemData[path] || null);
			}).catch((error) => {
				reject(error);
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	// Create new adapter by look up the adapterRegistry
	private createAdapter(backendData : BackendData){
		const adapterType = adapterRegistry[backendData.type] || null;	
		return adapterType ? new adapterType.type(this.http, this.settings) : null;
	}
}
