/*
 * brief    Application entry point
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

//-----------------------------------------------------------------------------

if (process.env.ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
