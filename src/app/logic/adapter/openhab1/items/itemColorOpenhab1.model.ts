/*
 * brief    Implementation of an OpenHAB 1 Color
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { ItemColor } from '../../../models/items/itemColor.model';
import { Openhab1Adapter } from '../openhab1.adapter';

//-----------------------------------------------------------------------------

export class ItemColorOpenhab1 extends ItemColor{

	constructor(protected adapter : Openhab1Adapter, private sourceWidget : any){
		super(sourceWidget.item.state);
		this.label = sourceWidget.label;
	}

	//-------------------------------------------------------------------------

	public setColor(color){
		super.setColor(color);
		this.adapter.updateValue(this.sourceWidget.item.link, color);
	}
}
