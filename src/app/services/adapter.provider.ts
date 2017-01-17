/*
 * brief    Manage settings of the application and persists them
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Http } from '@angular/http';
import { Settings } from '../services/settings.service';
import { MockAdapter } from '../services/adapter/mock.adapter';
import { Openhab1Adapter } from '../services/adapter/openhab1.adapter';

//-----------------------------------------------------------------------------

export function getAdapter(http : Http, settings : Settings) {

	if(settings.getSetting('backendType') === 'openhab1'){
		return new Openhab1Adapter(http, settings);
	}
	else{
		return new MockAdapter(http, settings);
	}
};
