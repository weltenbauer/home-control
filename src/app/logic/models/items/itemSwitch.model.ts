/*
 * brief    Data Model for item-switch
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';
import { BaseAdapter } from '../../adapter/base.adapter';

//-----------------------------------------------------------------------------

export class ItemSwitch extends Item{

	public type : ItemType = ItemType.Switch;
	public value : boolean = false;

	//-------------------------------------------------------------------------

	constructor(protected adapter : BaseAdapter, private defaultValue = false){
		super(adapter);
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
