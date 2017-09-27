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
		this.loadIcon(name);
	}

	// Icon state and size
	@Input('size') size? = 'normal';
	@Input('state') state? = 'normal';

	// Precached undefined icon
	private static undefinedIcon: any = null;

	//-------------------------------------------------------------------------

	constructor(private http: Http, private renderer: Renderer2, private elementRef: ElementRef) { }

	//-------------------------------------------------------------------------

	loadIcon(iconName: string) {

		// Clean component element
		const element = this.elementRef.nativeElement.children[0];
		element.innerHTML = '';

		// Load Icon
		this.loadSvg(iconName).then((icon)=>{
			this.renderer.appendChild(element, icon);
		}).catch(()=>{

			// Check if there is a precached undefined icon
			if(IconComponent.undefinedIcon === null){

				// Load undefined icon
				this.loadSvg('undefined').then((icon)=>{
					IconComponent.undefinedIcon = icon;
					this.renderer.appendChild(element, icon);
				}).catch((err)=>{
					console.error(err);
				});
			}
			else{

				// Add precached undefined icon
				this.renderer.appendChild(element, IconComponent.undefinedIcon);
			}
		});
	}

	//-------------------------------------------------------------------------

	loadSvg(iconName: string){

		return new Promise((resolve, reject) => {
			this.http.get(`assets/${iconName}.svg`).subscribe((res) => {

					// Load svg icon
					const response = res.text();
					const parser = new DOMParser();
					const svg = parser.parseFromString(response, 'image/svg+xml');

					// Added drop shadow
					/*svg.documentElement.children[0].setAttribute('style', 'filter:url(#dropshadow)')
                    const filter = parser.parseFromString('<defs><filter id="dropshadow"> <feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur><feOffset dx="2" dy="2" result="offsetblur"></feOffset><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>', 'image/svg+xml');
                    this.renderer.appendChild(svg.documentElement, filter.documentElement);*/

					resolve(svg.documentElement);
				},
				(err) => {
					reject(err);
				});
		});
	}
}
