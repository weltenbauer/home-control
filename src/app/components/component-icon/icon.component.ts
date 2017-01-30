/*
 * brief    Icon component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class IconComponent {

	@Input() icon : string;
	
	constructor() {}
}
