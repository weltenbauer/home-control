/*
 * brief    Button component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2016
 */

//-----------------------------------------------------------------------------

import { Component, Input, Output, EventEmitter } from '@angular/core';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-button',
	templateUrl: 'button.component.html',
	styleUrls: ['button.component.scss']
})
export class ButtonComponent {

	@Input() icon : string = '';
	@Input() label : string = '';
	@Input() size : string = '--normal';

	@Output() onClick : EventEmitter<any> = new EventEmitter();

	constructor() {}
}
