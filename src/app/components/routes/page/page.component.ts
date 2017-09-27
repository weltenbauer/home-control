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
import { Page } from '../../../logic/models/page.model';
import { Section } from '../../../logic/models/section.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-page',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy, AfterViewChecked {

	private pageTitle : string = '';
	private sections : Section[] = [];
	private parentPages: Page[] = [];

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
				this.parentPages = page.parentPages;
			});
		});
	}

	//-------------------------------------------------------------------------

	ngOnDestroy() {
		this.routeParamSub.unsubscribe();
	}

	//-------------------------------------------------------------------------

	// Set width of section container manually because of an flexbox issue
	// Ref: https://bugs.chromium.org/p/chromium/issues/detail?id=507397
	ngAfterViewChecked() {

		this.element.nativeElement.querySelectorAll('.page__sections__section__items').forEach((section)=>{

			let borderLeft = section.getBoundingClientRect().left;
			let borderRight = 0;

			section.querySelectorAll('.item').forEach((item)=>{
				borderRight = Math.max(borderRight, item.getBoundingClientRect().right);
			});

			section.setAttribute('style', 'width: ' + (borderRight - borderLeft) + 'px;');
		})
	}
}
