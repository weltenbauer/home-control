/*
 * brief    Page component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
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

//-----------------------------------------------------------------------------

export class PageComponent implements OnInit, OnDestroy {

	@ViewChild('scrollContainer') scrollContainer;
	@ViewChild('scrollBarContainer') scrollBarContainer;
	@ViewChild('scrollBarScroller') scrollBarScroller;

	private pageTitle: string = '';
	private sections: Section[] = [];
	private parentPages: Page[] = [];

	private routeParamSub: any;

	//-------------------------------------------------------------------------

	constructor(private route: ActivatedRoute, private dataProvider: DataProvider, private element: ElementRef, private renderer: Renderer2) {}

	//-------------------------------------------------------------------------

	ngOnInit() {

		// Register scroll listener
		this.renderer.listen(this.scrollContainer.nativeElement, 'scroll', ()=>{this.updateScrollBar()});

		// Subscribe to route parameter
		this.routeParamSub = this.route.params.subscribe((params) => {

			// Get Parameter and get coresponding page
			const id = params['id'] || '';

			// Get Data from DataProvider
			this.dataProvider.getPage(id).then((page) => {
				this.pageTitle = page.title;
				this.sections = page.sections;
				this.parentPages = page.parentPages;

				// Recalculate and set section width
				setTimeout(()=>{
					this.updateSectionWidth();
					this.updateScrollBar();
				}, 1000);
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
	updateSectionWidth() {

		this.element.nativeElement.querySelectorAll('.page__sections__section__items').forEach((section)=>{

			let borderLeft = section.getBoundingClientRect().left;
			let borderRight = 0;

			section.querySelectorAll('.item').forEach((item)=>{
				borderRight = Math.max(borderRight, item.getBoundingClientRect().right);
			});

			section.setAttribute('style', 'width: ' + (borderRight - borderLeft) + 'px;');
		});
	}

	//-------------------------------------------------------------------------

	updateScrollBar(){

		// Check if elements are available and rendered
		if(this.scrollContainer.nativeElement.children.length === 0){
			return;
		}

		// Get elements
		let scrollContainer = this.scrollContainer.nativeElement;
		let firstSectionElement = scrollContainer.children[0];
		let lastSectionElement = scrollContainer.children[scrollContainer.children.length-1];

		// Calculate widths and offsets
		let scrollBarWidth = this.scrollBarContainer.nativeElement.clientWidth;
		let scrollBarLeftOffset = this.scrollBarContainer.nativeElement.getBoundingClientRect().left - 1;
		let scrollContainerWidth = lastSectionElement.getBoundingClientRect().right - firstSectionElement.getBoundingClientRect().left;

		// Calculate dif between scrollContainer and innerScrollContent (in this case scrollBarWidth)
		let scrollContainerOffset = scrollContainerWidth - scrollBarWidth - scrollBarLeftOffset;

		// Set scrollbar width
		let scrollBarScrollerWidth = Math.min(scrollBarWidth / scrollContainerWidth, 1);
		this.scrollBarScroller.nativeElement.style.width = (scrollBarScrollerWidth * 100 + 1) + '%';

		// Set scroller position
		let posXPercent = ((scrollBarLeftOffset - firstSectionElement.getBoundingClientRect().left)) / scrollContainerOffset;
		let posXPixel = (scrollBarWidth - (scrollBarWidth * scrollBarScrollerWidth)) * posXPercent;
		this.scrollBarScroller.nativeElement.style.left = posXPixel + 'px';
	}
}
