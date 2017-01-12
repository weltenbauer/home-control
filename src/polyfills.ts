﻿/*
 * brief    Polyfills
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import 'core-js/client/shim';
import 'reflect-metadata';
import 'ts-helpers';
require('zone.js/dist/zone');

//-----------------------------------------------------------------------------

// Setup development build
if (process.env.ENV === 'development') {
	Error['stackTraceLimit'] = Infinity;
	require('zone.js/dist/long-stack-trace-zone');
}
