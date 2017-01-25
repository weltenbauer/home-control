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

import { DataProvider } from './services/dataProvider.service';
import { Settings } from './services/settings.service';
import { Routing } from './app.routing';

import { AppComponent } from './components/app/app.component';
import { PageComponent } from './components/route-page/page.component';
import { SettingsComponent } from './components/route-settings/settings.component';
import { ItemComponent } from './components/component-item/item.component';
import { LoadingComponent } from './components/component-loading/loading.component';

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
		PageComponent,
		ItemComponent,
		SettingsComponent,
		LoadingComponent
	],
	providers: [
		DataProvider,
		Settings
	],
	bootstrap: [
		AppComponent
	]
})

//-----------------------------------------------------------------------------

export class AppModule {
	constructor(public appRef: ApplicationRef) {}
}
