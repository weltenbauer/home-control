/*
 * brief    Data Model for item-switch
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemSwitch extends Item{

	public type: ItemType = ItemType.Switch;

	//-------------------------------------------------------------------------

	constructor(protected value: boolean = false){
		super();
	}

	//-------------------------------------------------------------------------

	public toggelSwitch(){
		this.value = !this.value;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(): string{
		return this.value ? 'On': 'Off';
	}
}
