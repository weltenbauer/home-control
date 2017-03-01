/*
 * brief    Root component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DataProvider } from '../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private dataProvider: DataProvider) {
		dataProvider.init();
	}

	//-------------------------------------------------------------------------

	refresh(){
		console.log('Refresh');
	}

	//-------------------------------------------------------------------------

	openHome(){
		console.log('Home');
	}

	//-------------------------------------------------------------------------

	openSettings(){
		console.log('Settings');
	}
}
