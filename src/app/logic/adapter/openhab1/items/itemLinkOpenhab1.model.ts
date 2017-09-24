/*
 * brief    Implementation of an OpenHAB 1 Link
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { ItemLink } from '../../../models/items/itemLink.model';
import { Openhab1Adapter } from '../openhab1.adapter';
import { iconMapping } from '../mappings';

//-----------------------------------------------------------------------------

export class ItemLinkOpenhab1 extends ItemLink{

	constructor(public sourceWidget : any, public target : string){
		super(target);

		this.label = sourceWidget.label;
		this.icon = iconMapping[sourceWidget.icon] || sourceWidget.icon;
	}
}
