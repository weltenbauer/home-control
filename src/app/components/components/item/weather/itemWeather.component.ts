/*
 * brief    ItemWeather component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     October 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { ItemWeather } from '../../../../logic/models/items/itemWeather.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-weather',
	templateUrl: 'itemWeather.component.html',
	styleUrls: ['../item.component.scss', './itemWeather.component.scss']
})
export class ItemWeatherComponent {
	@Input() item: ItemWeather;
}
