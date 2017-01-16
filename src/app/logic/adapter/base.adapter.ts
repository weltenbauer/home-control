/*
 * brief    Abstarct base class for all adapters
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { BackendDataModel } from '../models/backendData.model';

//-----------------------------------------------------------------------------

export abstract class BaseAdapter {
	abstract init(backendData : BackendDataModel);
	abstract getItemData();
}
