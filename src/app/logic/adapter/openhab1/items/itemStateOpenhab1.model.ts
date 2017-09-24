/*
 * brief    Implementation of an OpenHAB 1 State
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { ItemState } from '../../../models/items/itemState.model';
import { Openhab1Adapter } from '../openhab1.adapter';
import { iconMapping } from '../mappings';

//-----------------------------------------------------------------------------

export class ItemStateOpenhab1 extends ItemState{

	constructor(protected adapter : Openhab1Adapter, public sourceWidget : any){
		super();

		this.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;

		const result = sourceWidget.label.match(/\[(.*?)\]/g);
		if(result && result.length > 0){
			this.label = sourceWidget.label.replace(result[result.length - 1], '');
			this.state = result[result.length - 1].replace(/[\[\]]/g, '');
		}
		else{
			this.label = sourceWidget.label;
		}
	}
}
