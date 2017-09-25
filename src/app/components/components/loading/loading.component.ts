/*
 * brief    Loading-Screen component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DataProvider, DataProviderState } from '../../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-loading',
	templateUrl: 'loading.component.html',
	styleUrls: ['loading.component.scss']
})
export class LoadingComponent {

	constructor(private dataProvider: DataProvider) {}

	//-------------------------------------------------------------------------

	isVisible() {
		return this.dataProvider.state !== DataProviderState.Ok;
	}
}
