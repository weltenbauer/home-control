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

import { iconMapping } from './mappings';
import { ItemStateOpenhab1 } from "./items/itemStateOpenhab1.model";
import { ItemSwitchOpenhab1 } from "./items/itemSwitchOpenhab1.model";
import { ItemLinkOpenhab1 } from "./items/itemLinkOpenhab1.model";
import { ItemColorOpenhab1 } from "./items/itemColorOpenhab1.model";
import { ItemWeatherOpenhab1 } from "./items/itemWeatherOpenhab1.model";

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

	private convertToPage(id, sourcePage, parentPage = null){

		// Create page
		const page = new Page();
		page.id = id;
		page.title = sourcePage.title;
		page.parentPage = parentPage;
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

		let item = null;
		let itemType = sourceWidget.type;

		// Check for complex item types
		try {
			const complexItem = JSON.parse(sourceWidget.label);
			itemType = complexItem.type;
		}
		catch(e){};

		// Create Items
		if(itemType === 'Text'){
			item = new ItemStateOpenhab1(this, sourceWidget);
		}
		else if(itemType === 'Switch'){
			item = new ItemSwitchOpenhab1(this, sourceWidget);
		}
		else if(itemType === 'Colorpicker'){
			item = new ItemColorOpenhab1(this, sourceWidget);
		}
		else if(itemType === 'weather'){
			item = new ItemWeatherOpenhab1(this, sourceWidget);
		}
		else{
			item = new Item();
			item.label = sourceWidget.label;
			item.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;
		}

		// Save item
		parentSection.items.push(item);
	}

	//-------------------------------------------------------------------------

	private convertToLinkItem(sourceWidget, parentSection, target){
		const item = new ItemLinkOpenhab1(sourceWidget, target);
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
				this.convertToPage(widget.linkedPage.id, widget.linkedPage, parentPage);
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

	public updateValue(url : string, value : any){

		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');
		const options = new RequestOptions({ headers: headers });

		this.http.post(url, value, options).subscribe(
			data => {},
			err => { console.log(err); }
		);
	}
}
