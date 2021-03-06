/*
 * brief    Data Model for items
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2017
 */

//-----------------------------------------------------------------------------

export enum ItemType { Undefined, State, Switch, Button, Link, Color, Weather };

//-----------------------------------------------------------------------------

export class Item {

	public type: ItemType = ItemType.Undefined;

	//-------------------------------------------------------------------------

	constructor(public label: string = '', public icon: string = 'undefined'){}

	//-------------------------------------------------------------------------

	public getLabel(){
		return this.label;
	}

	//-------------------------------------------------------------------------

	public getValueLabel(){
		return '';
	}
}
