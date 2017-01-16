/*
 * brief    Define module
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DataProviderService } from './services/dataProvider.service';
import { Routing } from './app.routing';

import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/route-main/main.component';
import { SettingsComponent } from './components/route-settings/settings.component';

//-----------------------------------------------------------------------------

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		Routing
	],
	declarations: [
		AppComponent,
		MainComponent,
		SettingsComponent
	],
	providers: [
		DataProviderService
	],
	bootstrap: [
		AppComponent
	]
})

//-----------------------------------------------------------------------------

export class AppModule {
	constructor(public appRef: ApplicationRef) {}
}
