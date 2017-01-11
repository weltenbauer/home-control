import 'core-js/client/shim';
import 'reflect-metadata';
require('zone.js/dist/zone');

import 'ts-helpers';

// Setup development build
if (process.env.ENV === 'development') {
	Error['stackTraceLimit'] = Infinity;
	require('zone.js/dist/long-stack-trace-zone');
}
