/*
 * brief    Data Model for item-weather
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     October 2017
 */

//-----------------------------------------------------------------------------

import { Item, ItemType } from '../item.model';

//-----------------------------------------------------------------------------

export class ItemWeather extends Item{

	public type: ItemType = ItemType.Weather;

	//-------------------------------------------------------------------------

	constructor(protected value: Object){
		super();
	}
}
