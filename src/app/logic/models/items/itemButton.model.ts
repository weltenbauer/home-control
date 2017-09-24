/*
 * brief    Data Model for item-button
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2017
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemButton extends Item{

	public type : ItemType = ItemType.Button;

	//-------------------------------------------------------------------------

	public pushButton(){}
}
