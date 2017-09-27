/*
 * brief    Page component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, OnInit, OnDestroy, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from '../../../services/dataProvider.service';
import { Section } from '../../../logic/models/section.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-page',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy, AfterViewChecked {

	public pageTitle : string = '';
	public sections : Section[] = null;

	private routeParamSub : any;

	//-------------------------------------------------------------------------

	constructor(private route: ActivatedRoute, private dataProvider: DataProvider, private element: ElementRef) {}

	//-------------------------------------------------------------------------

	ngOnInit() {

		// Subscribe to route parameter
		this.routeParamSub = this.route.params.subscribe((params) => {

			// Get Parameter and get coresponding page
			const id = params['id'] || '';

			// Get Data from DataProvider
			this.dataProvider.getPage(id).then((page) => {
				this.pageTitle = page.title;
				this.sections = page.sections;
			});
		});
	}

	//-------------------------------------------------------------------------

	ngOnDestroy() {
		this.routeParamSub.unsubscribe();
	}

	//-------------------------------------------------------------------------

	ngAfterViewChecked() {
		//console.log(this.element.nativeElement.querySelector());
	}
}
