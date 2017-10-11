/*
 * brief    Item component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { Item, ItemType } from '../../../logic/models/item.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item',
	templateUrl: 'item.component.html',
	styleUrls: ['item.component.scss']
})
export class ItemComponent {
	@Input() item: Item;
	private _ItemType = ItemType;
}
