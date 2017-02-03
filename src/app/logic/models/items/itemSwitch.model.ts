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

	public type : ItemType = ItemType.Switch;
	public value : boolean = false;

	//-------------------------------------------------------------------------

	constructor(private defaultValue = false){
		super();
		this.value = defaultValue;
	}

	//-------------------------------------------------------------------------

	public onLocalChange(){
		this.value = !this.value;
		this.apply();
	}

	//-------------------------------------------------------------------------

	public getLabel(){
		return this.label;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.value ? 'On' : 'Off';
	}

	//-------------------------------------------------------------------------

	public getIconActiveState(){
		return this.value;
	}
}
