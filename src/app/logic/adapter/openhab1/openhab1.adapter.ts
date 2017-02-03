/*
 * brief    Interface to a OpenHAB 1 REST API
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseAdapter } from '../base.adapter';
import { Settings } from '../../../services/settings.service';
import { BackendData } from '../../models/backendData.model';

import { Page } from '../../models/page.model';
import { Section } from '../../models/section.model';
import { Item, ItemType } from '../../models/item.model';

import { itemTypeMapping, iconMapping } from './mappings';

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
				this.sitemaps = this.sitemaps.filter((element) => {
					return element.name === backendData.metaData.sitemap;
				});
				this.convertToPage('', this.sitemaps[0].homepage);
				console.log(this.pages);
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
		page.metaData = {
			originalData: sourcePage
		};
		this.pages[id] = page;

		// Itterate all elements in page
		this.nextStep(sourcePage.widget, page, null);
	}

	//-------------------------------------------------------------------------

	private convertToSection(sourceWidget, parentPage){

		// Create section
		const section = new Section();
		section.label = sourceWidget.label;
		section.metaData = {
			originalData: sourceWidget
		};
		parentPage.sections.push(section);

		// Itterate all items in section
		this.nextStep(sourceWidget.widget, parentPage, section);
	}

	//-------------------------------------------------------------------------

	private convertToItem(sourceWidget, parentSection){

		// Create item
		const item = itemTypeMapping[sourceWidget.type] ?  new itemTypeMapping[sourceWidget.type](this) : new Item(this);
		item.label = sourceWidget.label;
		item.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;

		// Set state
		const itemValue : any = sourceWidget.item.state;
		item.value = itemValue || null;

		// Set valueLabel
		if(itemValue === 'Uninitialized'){
			item.valueLabel = null;
		}
		else if(itemValue === 'Undefined' && sourceWidget.mapping && sourceWidget.mapping.label){
			item.valueLabel = sourceWidget.mapping.label;
		}
		else{
			item.valueLabel = sourceWidget.item.state;
		}

		// Save original
		item.metaData = {
			originalData: sourceWidget
		};

		// Set valueLabel
		const result = item.label.match(/\[(.*?)\]/g);
		if(result && result.length > 0){
			item.label = item.label.replace(result[result.length - 1], '');
			item.valueLabel = result[result.length - 1].replace(/[\[\]]/g, '');
		}

		// Save item
		parentSection.items.push(item);
	}

	//-------------------------------------------------------------------------

	private convertToLinkItem(sourceWidget, parentSection, target){

		// Create item
		const item = new Item(this);
		item.type = ItemType.Link;
		item.label = sourceWidget.label;
		item.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;
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
				if(parentPage.sections.length > 0 && parentPage.sections[parentPage.sections.length-1].isGeneric){
					this.convertToItem(widget, parentPage.sections[parentPage.sections.length-1]);
				}
				else {
					const section = new Section(true);
					parentPage.sections.push(section);
					this.convertToItem(widget, section);
				}
			}

			// Create item
			else{
				this.convertToItem(widget, parentSection);
			}
		});
	}


	//-------------------------------------------------------------------------

	public updateValue(item : Item, value : any){

		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');
		const options = new RequestOptions({ headers: headers });

		this.http.post(item.metaData.originalData.item.link, value, options).subscribe(
			data => {},
			err => { console.log(err); }
		);
	}
}
