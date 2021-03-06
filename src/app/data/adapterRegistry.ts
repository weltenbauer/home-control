/*
 * brief    Registry for all available adapter
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { MockAdapter } from '../logic/adapter/mock/mock.adapter';
import { Openhab1Adapter } from '../logic/adapter/openhab1/openhab1.adapter';

//-----------------------------------------------------------------------------

export const adapterRegistry = {
	mock: {
		name: 'Mock',
		type: MockAdapter
	},
	openhab1: {
		name: 'OpenHAB 1',
		type: Openhab1Adapter
	}
};
