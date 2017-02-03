/*
 * brief    Implementation of an OpenHAB 1 Switch
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { ItemSwitch } from '../../../models/items/itemSwitch.model';
import { BaseAdapter } from '../../base.adapter';

//-----------------------------------------------------------------------------

export class ItemSwitchOpenhab1 extends ItemSwitch{

	constructor(protected adapter : BaseAdapter){
		super(adapter);
	}

	//-------------------------------------------------------------------------

	public apply(){
		const newValue = this.value ? 'ON' : 'OFF';
		this.adapter.updateValue(this, newValue);
	}
}
