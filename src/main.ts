/*
 * brief    Main start point
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Global styles
import './style/base.scss';

//-----------------------------------------------------------------------------

// Enable production mode
if (process.env.ENV === 'production') {
	enableProdMode();
}

//-----------------------------------------------------------------------------

// Main start function
export function main() {
	return platformBrowserDynamic().bootstrapModule(AppModule);
}

//-----------------------------------------------------------------------------

// Wait for browser
document.readyState === 'complete' ? main() : document.addEventListener('DOMContentLoaded', main);
