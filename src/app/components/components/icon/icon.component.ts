/*
 * brief    Icon component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 *
 * source	https://medium.com/@amcdnl/an-angular2-icon-component-c9833acd8c1d
 */

//-----------------------------------------------------------------------------

import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})

//-----------------------------------------------------------------------------

export class IconComponent {

	@Input('icon')
	set icon(name: string) {
		this.loadSvg(name);
	}

	@Input('size') size? = 'normal';
	@Input('active') active? = false;

	//-------------------------------------------------------------------------

	constructor(private http: Http, private renderer: Renderer2, private elementRef: ElementRef) { }

	//-------------------------------------------------------------------------

	loadSvg(name: string) {

		// Load active icon
		let iconName = this.active ? name + '-active' : name;

		// Load svg
		this.http.get(`assets/${iconName}.svg`).subscribe((res) => {

				// Clean component element
				const element = this.elementRef.nativeElement.children[0];
				element.innerHTML = '';

				// Load svg icon
				const response = res.text();
				const parser = new DOMParser();
				const svg = parser.parseFromString(response, 'image/svg+xml');

				// Added drop shadow
				svg.documentElement.children[0].setAttribute('style', 'filter:url(#dropshadow)')
				const filter = parser.parseFromString('<defs><filter id="dropshadow"> <feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur><feOffset dx="2" dy="2" result="offsetblur"></feOffset><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>', 'image/svg+xml');
				this.renderer.appendChild(svg.documentElement, filter.documentElement);

				// Append icon to dom
				this.renderer.appendChild(element, svg.documentElement);
			},
			(err) => {
				console.error(err);
			});
	}
}
