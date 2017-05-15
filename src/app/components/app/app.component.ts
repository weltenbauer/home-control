/*
 * brief    Root component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private dataProvider: DataProvider, private router : Router) {
		dataProvider.init();
	}

	//-------------------------------------------------------------------------

	refresh(){
		this.dataProvider.init();

		// Todo: Refresh view
	}

	//-------------------------------------------------------------------------

	openHome(){
		this.router.navigateByUrl('/page');
	}

	//-------------------------------------------------------------------------

	openSettings(){
		this.router.navigateByUrl('/settings');
	}
}
