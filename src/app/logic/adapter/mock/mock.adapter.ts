/*
 * brief    Provide mock data for development and testing
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http } from '@angular/http';
import { BaseAdapter } from '../base.adapter';
import { Settings } from '../../../services/settings.service';
import { BackendData } from '../../models/backendData.model';

import { Page } from '../../models/page.model';
import { Section } from '../../models/section.model';
import { Item } from '../../models/item.model';
import { ItemLink } from '../../models/items/itemLink.model';

//-----------------------------------------------------------------------------

export class MockAdapter extends BaseAdapter{

	constructor(private http : Http, private settings : Settings){
		super();
	}

	//-------------------------------------------------------------------------

	init(backendData : BackendData){
		return Promise.resolve();
	}

	//-------------------------------------------------------------------------

	getPages(){

		let linkItem1 = new ItemLink('obergeschoss');
		let linkItem2 = new ItemLink('wohnzimmer');

		//-------------------------------------

		let section1 = new Section();
		section1.label = 'Bereich 1';
		section1.items = [new Item('Strahler', 'switch'), new Item(), linkItem1];

		let section2 = new Section();
		section2.label = 'Bereich 2';
		section2.items = [linkItem2, new Item('Anwesenheit', 'boy'), new Item('Helligkeit', 'sun'), new Item('', 'power'), new Item('', 'door'), new Item('', 'trashcan'), new Item('', 'battery')];

		let section3 = new Section();
		section3.label = 'Bereich 3';
		section3.items = [new Item('Licht Farbe', 'sun'), new Item('', 'screwdriver')];

		let section4 = new Section();
		section4.label = 'Bereich 4';
		section4.items = [new Item(), new Item('Temperatur', 'thermometer')];

		let section5 = new Section();
		section5.label = 'Bereich 5';
		section5.items = [new Item('Anwesenheit', 'girl'), new Item(), new Item()];

		let section6 = new Section();
		section6.label = 'Bereich 6';
		section6.items = [new Item(), new Item()];

		//-------------------------------------

		let page1 = new Page();
		page1.id = '';
		page1.title = 'Home Control';
		page1.sections = [section1, section2, section3, section4, section5, section6, section1, section2, section3, section4, section5, section6];

		let page2 = new Page();
		page2.id = 'obergeschoss';
		page2.title = 'Obergeschoss';
		page2.sections = [section1, section2, section3];
		page2.parentPage = page1;

		let page3 = new Page();
		page3.id = 'wohnzimmer';
		page3.title = 'Wohnzimmer';
		page3.sections = [section1, section2, section3];
		page3.parentPage = page2;

		return Promise.resolve({'': page1, 'obergeschoss': page2, 'wohnzimmer': page3});
	}

	//-------------------------------------------------------------------------

	updateValue(item){}
}
