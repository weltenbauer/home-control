/*
 * brief    Set the BG Image offset of an element
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

//-----------------------------------------------------------------------------

@Directive({ selector: '[hcBackgroundPosition]' })
export class BackgroundPositionDirective implements OnInit {

	constructor(private el : ElementRef) {}

	//-------------------------------------------------------------------------

	ngOnInit(){
		this.setBgPosition();
	}

	//-------------------------------------------------------------------------

	@HostListener('window:resize', ['$event'])
	private setBgPosition(){
		this.el.nativeElement.style.backgroundSize = window.innerWidth + 'px ' + window.innerHeight + 'px';
		this.el.nativeElement.style.backgroundPosition = (-this.el.nativeElement.getBoundingClientRect().left) + 'px ' + (-this.el.nativeElement.getBoundingClientRect().top) + 'px';
	}
}
