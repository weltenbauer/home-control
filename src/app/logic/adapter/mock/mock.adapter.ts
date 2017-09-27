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

		let section1 = new Section();
		section1.label = 'Bereich 1';
		section1.items = [new Item('Strahler', 'switch'), new Item()];

		let section2 = new Section();
		section2.label = 'Bereich 2';
		section2.items = [new Item(), new Item('Helligkeit', 'sun'), new Item(), new Item(), new Item(), new Item()];

		let section3 = new Section();
		section3.label = 'Bereich 3';
		section3.items = [new Item('Licht Farbe', 'sun'), new Item()];

		let section4 = new Section();
		section4.label = 'Bereich 4';
		section4.items = [new Item(), new Item('Temperatur', 'thermometer')];

		let section5 = new Section();
		section5.label = 'Bereich 5';
		section5.items = [new Item(), new Item(), new Item()];

		let section6 = new Section();
		section6.label = 'Bereich 6';
		section6.items = [new Item(), new Item()];

		let page = new Page();
		page.title = 'Home Control';
		page.sections = [section1, section2, section3, section4, section5, section6, section1, section2, section3, section4, section5, section6];

		return Promise.resolve({'': page});
	}

	//-------------------------------------------------------------------------

	updateValue(item){}
}
