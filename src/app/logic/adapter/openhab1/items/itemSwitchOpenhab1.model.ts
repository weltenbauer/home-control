/*
 * brief    Implementation of an OpenHAB 1 Switch
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { ItemSwitch } from '../../../models/items/itemSwitch.model';
import { Openhab1Adapter } from '../openhab1.adapter';
import { iconMapping } from '../mappings';

//-----------------------------------------------------------------------------

export class ItemSwitchOpenhab1 extends ItemSwitch{

	constructor(protected adapter: Openhab1Adapter, private sourceWidget: any){
		super();

		this.label = sourceWidget.label;
		this.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;
		this.value = sourceWidget.item.state === 'ON';
	}

	//-------------------------------------------------------------------------

	public toggelSwitch(){

		// Toggel Switch
		super.toggelSwitch();

		// Update data on server
		const newValue = this.value ? 'ON' : 'OFF';
		this.adapter.updateValue(this.sourceWidget.item.link, newValue);
	}
}
