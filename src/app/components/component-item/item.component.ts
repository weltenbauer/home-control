/*
 * brief    Item component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, Input, trigger, style, transition, animate } from '@angular/core';
import { Item } from '../../logic/models/item.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity: 1}),
				animate('.5s', style({opacity: 1})) 
			]),
			transition(':leave', [
				animate('1.2s 1s', style({opacity: 0})) 
			])
		])
	]
})
export class ItemComponent {
	@Input() item : Item;
	
	constructor() {}
}
