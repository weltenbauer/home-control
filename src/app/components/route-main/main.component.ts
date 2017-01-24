/*
 * brief    Main component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DataProvider } from '../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {

	public items = {};
	
	constructor(private dataProvider: DataProvider) {
		dataProvider.getSections('main').then((data) => {
			this.items = data;
		});
	}
}
