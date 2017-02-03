/*
 * brief    Data Model for items
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { BaseAdapter } from '../adapter/base.adapter';

//-----------------------------------------------------------------------------

export enum ItemType { Undefined, State, Switch, Button, Link, Color };

//-----------------------------------------------------------------------------

export class Item {

	public type : ItemType = ItemType.Undefined;
	public label : string = '';
	public icon : string = 'none';
	public value : any;
	public valueLabel : string = '';
	public metaData : any;

	//-------------------------------------------------------------------------

	constructor(protected adapter : BaseAdapter){}

	//-------------------------------------------------------------------------

	public getLabel(){
		return this.label;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return this.valueLabel;
	}

	//-------------------------------------------------------------------------

	public getIconActiveState(){
		return false;
	}

	//-------------------------------------------------------------------------

	public apply(){}
	public onLocalChange(){}
}
