/*
 * brief    Interface to a OpenHAB 1 REST API
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http, Headers } from '@angular/http';
import { BaseAdapter } from './base.adapter';
import { Settings } from '../../services/settings.service';
import { BackendData } from '../models/backendData.model';

import { Page } from '../models/page.model';
import { Section } from '../models/section.model';
import { Item } from '../models/item.model';

//-----------------------------------------------------------------------------

export class Openhab1Adapter extends BaseAdapter{

	private initPromise : any = null;

	private items : any[] = [];
	private sitemaps : any[] = [];
	private pages : any = {};

	//-------------------------------------------------------------------------
	
	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	public init(backendData : BackendData){
	
		// Create new promise
		this.initPromise = new Promise((resolve, reject) => {
		
			// Prepare GET headers
			const headers = new Headers({ 'Accept': 'application/json' });
			const options = { headers: headers };
		
			// Collect all requests
			const requestPromises : Promise<void>[] = [];
			
			// Request items
			requestPromises.push(this.http.get(backendData.getUrl() + '/items', options).toPromise()
				.then((response) => {
				
					// Check for multiple items
					let items = response.json().item;
					if(!(items instanceof Array)){
						items = [items];
					}
				
					// Save items
					this.items = items;
				})
				.catch((error) => {
					reject({
						label: 'Error while request items',
						details: error
					});
				})
			);
			
			// Request Sitemaps
			requestPromises.push(this.http.get(backendData.getUrl() + '/sitemaps', options).toPromise()
				.then((response) => {
				
					// Select all sitemap requests
					const requestSitemapsPromises : Promise<void>[] = [];
				
					// Check for multiple sitemaps
					let sitemaps = response.json().sitemap;
					if(!(sitemaps instanceof Array)){
						sitemaps = [sitemaps];
					}
					
					// Get data of all sitemaps
					sitemaps.forEach((sitemap) => {
						requestSitemapsPromises.push(this.http.get(sitemap.link).toPromise()
							.then((response) => {
								this.sitemaps.push(response.json());
							})
							.catch((error) => {
								reject({
									label: 'Error while request sitemap',
									details: error
								});
							})
						);
					});
					
					// Wait for all requests
					return Promise.all(requestSitemapsPromises);
				})
				.catch((error) => {
					reject({
						label: 'Error while request sitemaps',
						details: error
					});
				})
			);
					
			// Resolve after all requests finished
			Promise.all(requestPromises).then(() => {
				this.convertToPage('', this.sitemaps[1].homepage);
				resolve();
			});
		});
		
		return this.initPromise;
	}
	
	//-------------------------------------------------------------------------
	
	public getPages(){
	
		return new Promise((resolve, reject) => {
	
			// Check if app was already initalized
			if(!this.initPromise){
				reject('Not yet initalized');
			}
			else{
			
				// Return data
				this.initPromise.then(() => {
					resolve(this.pages);
				}).catch((error) => {
					reject(error);
				});
			}
		});
	}
	
	//-------------------------------------------------------------------------
	
	private convertToPage(id, sourcePage){
		
		// Create page
		const page = new Page();
		page.title = sourcePage.title;
		this.pages[id] = page;
		
		// Itterate all elements in page
		this.nextStep(sourcePage.widget, page, null);
	}
	
	//-------------------------------------------------------------------------
	
	private convertToSection(sourceWidget, parentPage){
	
		// Create section
		const section = new Section();
		section.label = sourceWidget.label;
		parentPage.sections.push(section);
		
		// Itterate all items in section
		this.nextStep(sourceWidget.widget, parentPage, section);
	}
	
	//-------------------------------------------------------------------------
	
	private convertToItem(sourceWidget, parentSection){
	
		// Create item
		const item = new Item();
		item.type = sourceWidget.type;
		item.label = sourceWidget.label;
		item.icon = sourceWidget.icon;
		item.value = sourceWidget.item.state;
		
		parentSection.items.push(item);
	}
	
	//-------------------------------------------------------------------------
	
	private convertToLinkItem(sourceWidget, parentSection, target){
	
		// Create item
		const item = new Item();
		item.type = 'Link';
		item.label = sourceWidget.label;
		item.icon = sourceWidget.icon;
		item.value = target;
		
		parentSection.items.push(item);
	}
	
	//-------------------------------------------------------------------------
	
	private nextStep(sourceWidgets, parentPage, parentSection){
	
		// Check if widgets available
		if(!sourceWidgets){
			return;
		}
	
		// Check if source is a array
		if(!(sourceWidgets instanceof Array)){
			sourceWidgets = [sourceWidgets];
		}
		
		// Itterate all widget on this stage
		sourceWidgets.forEach((widget) => {
			
			// Create page
			if(widget.linkedPage){
				this.convertToLinkItem(widget, parentSection, widget.linkedPage.id);
				this.convertToPage(widget.linkedPage.id, widget.linkedPage);
			}
			
			// Create section
			else if(widget.type === 'Frame'){
				this.convertToSection(widget, parentPage);
			}
			
			// Create item in generic section
			else if(!parentSection){			
				const section = new Section();
				parentPage.sections.push(section);
				this.convertToItem(widget, section);
			}
			
			// Create item
			else{
				this.convertToItem(widget, parentSection);
			}
		});
	}
}
