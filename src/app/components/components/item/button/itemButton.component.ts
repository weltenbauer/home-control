/*
 * brief    ItemSwitch component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { ItemButton } from '../../../../logic/models/items/itemButton.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-button',
	templateUrl: 'itemButton.component.html',
	styleUrls: ['../item.component.scss']
})
export class ItemButtonComponent {
	@Input() item: ItemButton;
}
