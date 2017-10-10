/*
 * brief    Implementation of an OpenHAB 1 Weather
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     October 2017
 */

//-----------------------------------------------------------------------------

import { ItemWeather } from '../../../models/items/itemWeather.model';
import { Openhab1Adapter } from '../openhab1.adapter';

//-----------------------------------------------------------------------------

export class ItemWeatherOpenhab1 extends ItemWeather{

	constructor(protected adapter: Openhab1Adapter, public sourceWidget: any){
		super(JSON.parse(sourceWidget.label)[0].value);
		this.label = JSON.parse(sourceWidget.label)[0].label;
	}
}
