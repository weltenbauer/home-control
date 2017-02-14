/*
 * brief    Data Model for item-color
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemColor extends Item{

	public type : ItemType = ItemType.Color;

	//-------------------------------------------------------------------------

	constructor(private colorValue : string = ''){
		super();
	}

	//-------------------------------------------------------------------------

	public setColor(colorValue : string){
		this.colorValue = colorValue;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.colorValue;
	}
}
