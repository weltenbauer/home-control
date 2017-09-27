/*
 * brief    ItemSwitch component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { ItemSwitch } from '../../../../logic/models/items/itemSwitch.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-switch',
	templateUrl: 'itemSwitch.component.html',
	styleUrls: ['../item.component.scss']
})
export class ItemSwitchComponent {
	@Input() item: ItemSwitch;
}
