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

	private items : any[] = [];
	private sitemaps : any[] = [];
	private pages : any = {};

	//-------------------------------------------------------------------------
	
	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	public init(backendData : BackendData){
	
		return new Promise((resolve, reject) => {
		
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
					reject(error);
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
								reject(error);
							})
						);
					});
					
					// Wait for all requests
					return Promise.all(requestSitemapsPromises);
				})
				.catch((error) => {
					reject(error);
				})
			);
						
			// Resolve after all requests finished
			Promise.all(requestPromises).then(() => {
				this.convertToPage('', this.sitemaps[1].homepage);
				resolve();
			});
		});
	}
	
	//-------------------------------------------------------------------------
	
	public getPages(){
		return this.pages;
	}
	
	//-------------------------------------------------------------------------
	
	private convertToPage(path, sourcePage){
		
		// Create page
		const page = new Page();
		page.label = sourcePage.title;
		this.pages[path] = page;
		
		// Itterate all elements in page
		this.nextStep(path, sourcePage.widget, page, null);
	}
	
	//-------------------------------------------------------------------------
	
	private convertToSection(path, sourceWidget, parentPage){
	
		// Create section
		const section = new Section();
		section.label = sourceWidget.label;
		parentPage.sections.push(section);
		
		// Itterate all items in section
		this.nextStep(path, sourceWidget.widget, parentPage, section);
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
	
	private nextStep(path, sourceWidgets, parentPage, parentSection){
	
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
				this.convertToPage(path + '/' + widget.linkedPage.id, widget.linkedPage);
			}
			
			// Create section
			else if(widget.type === 'Frame'){
				this.convertToSection(path, widget, parentPage);
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
