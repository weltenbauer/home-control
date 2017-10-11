/*
 * brief    Loading-Screen component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataProvider, DataProviderState } from '../../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-loading',
	templateUrl: 'loading.component.html',
	styleUrls: ['loading.component.scss'],
	animations: [
		trigger('loadingComponentVisible', [
			state('hide', style({
				opacity: 0
			})),
			state('show', style({
				opacity: 1
			})),
			transition('hide => show', animate('250ms ease-in')),
			transition('show => hide', animate('2000ms 1500ms ease-out'))
		])
	]
})

//-----------------------------------------------------------------------------

export class LoadingComponent implements OnInit, OnDestroy{

	private visibleState = 'show';
	private stateStreamHandle = null

	//-------------------------------------------------------------------------

	constructor(private dataProvider: DataProvider) {}

	//-------------------------------------------------------------------------

	ngOnInit(){
		this.stateStreamHandle = this.dataProvider.stateStream.subscribe((state)=>{
			this.visibleState = state === DataProviderState.Ok ? 'hide': 'show';
		});
	}

	//-------------------------------------------------------------------------

	ngOnDestroy(){
		this.stateStreamHandle.unsubscribe();
	}
}
