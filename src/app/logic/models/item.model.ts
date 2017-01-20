/*
 * brief    Data Model for items
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

export class Item {
	public type : string = '';
	public label : string = '';
	public icon : string = '';
	public value : any;
}
