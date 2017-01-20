/*
 * brief    Data Model for sections
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Item } from './item.model';

//-----------------------------------------------------------------------------

export class Section {
	public label : string = '';
	public items : Item[] = [];
}
