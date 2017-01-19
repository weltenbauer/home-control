/*
 * brief    Root component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DataProvider } from '../../services/dataProvider.service';

import '../../../style/app.scss';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	private url = 'http://www.weltenbauer-se.com';
	private items = {};
	
	constructor(private dataProvider: DataProvider) {
		dataProvider.init().then(() => {
			dataProvider.getItems('main').then((data) => {
				this.items = data;
			});
		});
	}
}
