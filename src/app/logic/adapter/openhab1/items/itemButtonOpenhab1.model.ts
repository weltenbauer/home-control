/*
 * brief    Implementation of an OpenHAB 1 Button
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { ItemButton } from '../../../models/items/itemButton.model';
import { Openhab1Adapter } from '../openhab1.adapter';
import { iconMapping } from '../mappings';

//-----------------------------------------------------------------------------

export class ItemButtonOpenhab1 extends ItemButton{

	constructor(protected adapter: Openhab1Adapter, private sourceWidget: any){
		super();

		this.label = sourceWidget.label;
		this.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.sourceWidget.mapping.label;
	}

	//-------------------------------------------------------------------------

	public pushButton(){
		this.adapter.updateValue(this.sourceWidget.item.link, this.sourceWidget.mapping.command);
	}
}
