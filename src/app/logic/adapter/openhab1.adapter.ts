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

	private items : any[] = [];
	private sitemaps : any[] = [];

	//-------------------------------------------------------------------------
	
	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	public init(backendData : BackendData){
	
		return new Promise((resolve, reject) => {
		
			// Collect all requests
			const requestPromises : Promise<void>[] = [];
			
			// Request items
			requestPromises.push(this.http.get(backendData.url + '/items').toPromise()
				.then((response) => {
					this.items = response.json().item;
				})
				.catch((error) => {
					reject(error);
				})
			);
			
			// Request Sitemaps
			requestPromises.push(this.http.get(backendData.url + '/sitemaps').toPromise()
				.then((response) => {
				
					// Check for multiple sitemaps
					let sitemaps = response.json().sitemap;
					if(!(sitemaps instanceof Array)){
						sitemaps = [sitemaps];
					}
					
					// Get data of all sitemaps
					sitemaps.forEach((sitemap) => {
						requestPromises.push(this.http.get(sitemap.link).toPromise()
							.then((response) => {
								this.sitemaps.push(response.json());
							})
							.catch((error) => {
								reject(error);
							})
						);
					});
				})
				.catch((error) => {
					reject(error);
				})
			);
						
			// Resolve after all requests finished
			Promise.all(requestPromises).then(() => {
				console.log(this);
				resolve();
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	public getItemData(){
		return this.items;
	}
}
