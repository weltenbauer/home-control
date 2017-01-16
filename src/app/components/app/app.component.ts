/*
 * brief    Root component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DataProviderService } from '../../services/dataProvider.service';

import '../../../style/app.scss';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	url = 'http://www.weltenbauer-se.com';

	constructor(private api: DataProviderService) {
		// Do something with api
	}
}
