/*
 * brief    Data Model for item-link
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Router } from '@angular/router';
import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemLink extends Item{

	public type: ItemType = ItemType.Link;

	//-------------------------------------------------------------------------

	constructor(protected target : string){
		super();
	}

	//-------------------------------------------------------------------------

	getTarget(){
		return this.target;
	}
}
