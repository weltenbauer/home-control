/*
 * brief    Abstarct base class for all adapters
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { BackendData } from '../models/backendData.model';
import { Item } from '../models/item.model';

//-----------------------------------------------------------------------------

export abstract class BaseAdapter {
	abstract init(backendData : BackendData) : Promise<any>;
	abstract getPages() : Promise<any>;
}
