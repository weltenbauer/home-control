/*
 * brief    Main app component that wraps all other components
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import {Directive, ElementRef, Renderer2} from '@angular/core';

//-----------------------------------------------------------------------------

@Directive({
	selector: '[preventScroll]',
})
export class PreventScrollDirective {
	constructor(private elRef: ElementRef, private renderer: Renderer2) {

		renderer.listen(elRef.nativeElement, 'touchmove', (e) => {
			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		});
	}
}
