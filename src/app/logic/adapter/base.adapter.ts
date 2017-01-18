/*
 * brief    Abstarct base class for all adapters
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

export abstract class BaseAdapter {
	abstract init(backendData : any);
	abstract getItemData();
}
