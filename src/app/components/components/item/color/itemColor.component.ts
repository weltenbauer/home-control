/*
 * brief    ItemColor component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { ItemColor } from '../../../../logic/models/items/itemColor.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-color',
	templateUrl: 'itemColor.component.html',
	styleUrls: ['../item.component.scss']
})
export class ItemColorComponent {
	@Input() item : ItemColor;
}
