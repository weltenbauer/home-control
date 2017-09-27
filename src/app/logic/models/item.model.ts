/*
 * brief    Data Model for items
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2017
 */

//-----------------------------------------------------------------------------

import { BaseAdapter } from '../adapter/base.adapter';

//-----------------------------------------------------------------------------

export enum ItemType { Undefined, State, Switch, Button, Link, Color };

//-----------------------------------------------------------------------------

export class Item {

	public type : ItemType = ItemType.Undefined;
	public label : string = '';
	public icon : string = 'undefined';

	//-------------------------------------------------------------------------

	constructor(label: string = '', icon: string = 'undefined'){
		this.label = label;
		this.icon = icon;
	}

	//-------------------------------------------------------------------------

	public getLabel(){
		return this.label;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return '';
	}
}
