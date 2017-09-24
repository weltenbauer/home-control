/*
 * brief    Loading-Screen component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, trigger, style, transition, animate } from '@angular/core';
import { DataProvider, DataProviderState } from '../../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-loading',
	templateUrl: 'loading.component.html',
	styleUrls: ['loading.component.scss'],
	/*animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity: 1}),
				animate('.5s', style({opacity: 1}))
			]),
			transition(':leave', [
				animate('1.2s 1s', style({opacity: 0}))
			])
		])
	]*/
})
export class LoadingComponent {

	constructor(private dataProvider: DataProvider) {}

	//-------------------------------------------------------------------------

	isVisible() {
		return this.dataProvider.state !== DataProviderState.Ok;
	}
}
