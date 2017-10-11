/*
 * brief    Data Model for item-state
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemState extends Item{

	public type: ItemType = ItemType.State;

	//-------------------------------------------------------------------------

	constructor(protected state: string = ''){
		super();
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.state;
	}
}
