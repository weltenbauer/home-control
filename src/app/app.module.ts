/*
 * brief    Define app module
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';

import { AppComponent } from './components/app/app.component';

import { BgImageComponent } from './components/components/bg-image/bg-image.component';

//-----------------------------------------------------------------------------

// Import global fonts and styles

import '../assets/fonts/open-sans-v14-latin-300.eot';
import '../assets/fonts/open-sans-v14-latin-300.svg';
import '../assets/fonts/open-sans-v14-latin-300.ttf';
import '../assets/fonts/open-sans-v14-latin-300.woff';
import '../assets/fonts/open-sans-v14-latin-300.woff2';
import '../assets/fonts/open-sans-v14-latin-700.eot';
import '../assets/fonts/open-sans-v14-latin-700.svg';
import '../assets/fonts/open-sans-v14-latin-700.ttf';
import '../assets/fonts/open-sans-v14-latin-700.woff';
import '../assets/fonts/open-sans-v14-latin-700.woff2';
import '../assets/fonts/open-sans-v14-latin-regular.eot';
import '../assets/fonts/open-sans-v14-latin-regular.svg';
import '../assets/fonts/open-sans-v14-latin-regular.ttf';
import '../assets/fonts/open-sans-v14-latin-regular.woff';
import '../assets/fonts/open-sans-v14-latin-regular.woff2';


import '../assets/backgrounds/fog01.jpg';
import '../assets/backgrounds/sunny01.jpg';

import '../styles/base.scss';

//-----------------------------------------------------------------------------

@NgModule({
	imports: [
		BrowserModule,
		Routing,
		HttpModule
	],
	declarations: [
		AppComponent,
		BgImageComponent
	],
	providers: [

	],
	bootstrap: [
		AppComponent
	]
})

//-----------------------------------------------------------------------------

export class AppModule { }
