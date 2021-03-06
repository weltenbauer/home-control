/*
 * brief    Polyfill definitions
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
require('flexibility/flexibility');

//-----------------------------------------------------------------------------

// Development and test
if (process.env.ENV !== 'production') {
	Error['stackTraceLimit'] = Infinity;
	require('zone.js/dist/long-stack-trace-zone');
}
