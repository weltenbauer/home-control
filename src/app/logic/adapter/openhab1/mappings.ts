/*
 * brief    Mappings from Openhab1 to internal Data types
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { ItemState } from '../../models/items/itemState.model';
import { ItemSwitchOpenhab1 } from './items/itemSwitchOpenhab1.model';

//-----------------------------------------------------------------------------

export const itemTypeMapping = {
	'Text': ItemState,
	'Switch': ItemSwitchOpenhab1
};

//-----------------------------------------------------------------------------

export const iconMapping = {
	'boy1': 'boy',
	'boy2': 'boy',
	'boy3': 'boy',
	'boy4': 'boy',
	'child1': 'girl',
	'child2': 'girl',
	'temperature': 'thermometer',
	'door-open': 'door',
	'door-closed': 'door',
	'switch-on': 'switch',
	'switch-off': 'switch'
};
