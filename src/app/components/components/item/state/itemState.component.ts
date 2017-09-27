/*
 * brief    ItemState component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { ItemState } from '../../../../logic/models/items/itemState.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-state',
	templateUrl: 'itemState.component.html',
	styleUrls: ['../item.component.scss']
})
export class ItemStateComponent {
	@Input() item : ItemState;
}
