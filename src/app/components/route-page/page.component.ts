/*
 * brief    Page component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from '../../services/dataProvider.service';
import { Section } from '../../logic/models/section.model';

// @Todo: Remove iScroll Hack and embed iScroll the right way
declare let IScroll : any;
import 'iscroll/build/iscroll';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss']
})
export class PageComponent {

	public pageTitle : string = '';
	public sections : Section[] = null;

	private routeParamSub : any;

	//-------------------------------------------------------------------------

	constructor(private route : ActivatedRoute , private dataProvider : DataProvider) {}

	//-------------------------------------------------------------------------

	ngOnInit() {

		// Init ScrollContainer
		const sectionScroller = new IScroll('#pageSectionsScrollContainer', {
			scrollX: true,
			scrollY: false,
			scrollbars: true,
			mouseWheel: true
		});

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
}
