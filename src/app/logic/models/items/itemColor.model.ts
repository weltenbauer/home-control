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

	public type: ItemType = ItemType.Color;

	//-------------------------------------------------------------------------

	constructor(protected color: string = '000000'){
		super();
	}

	//-------------------------------------------------------------------------

	public setColor(color : string){
		this.color = color;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.color;
	}
}
