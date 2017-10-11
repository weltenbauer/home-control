/*
 * brief    Define app module
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Routing } from './app.routing';

// Components
import { AppComponent } from './components/app/app.component';
import { BgImageComponent } from './components/components/bg-image/bg-image.component';
import { ButtonComponent } from './components/components/button/button.component';
import { IconComponent } from './components/components/icon/icon.component';
import { ItemComponent } from './components/components/item/item.component';
import { ItemButtonComponent } from './components/components/item/button/itemButton.component';
import { ItemColorComponent } from './components/components/item/color/itemColor.component';
import { ItemLinkComponent } from './components/components/item/link/itemLink.component';
import { ItemStateComponent } from './components/components/item/state/itemState.component';
import { ItemSwitchComponent } from './components/components/item/switch/itemSwitch.component';
import { ItemWeatherComponent } from './components/components/item/weather/itemWeather.component';
import { LoadingComponent } from './components/components/loading/loading.component';

// Directives
import { PreventScrollDirective } from './directives/prevent-scroll';

// Routes
import { PageComponent } from './components/routes/page/page.component';
import { SettingsComponent } from './components/routes/settings/settings.component';
import { InfoComponent } from './components/routes/info/info.component';

// Services
import { BgWeatherImage } from "./services/bgWeatherImage.service";
import { DataProvider } from './services/dataProvider.service';
import { Settings } from './services/settings.service';
import { WebSocketService } from './services/websocket.service';

//-----------------------------------------------------------------------------

// Import global styles
import '../styles/base.scss';

//-----------------------------------------------------------------------------

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		Routing,
		HttpModule,
		LazyLoadImageModule
	],
	declarations: [
		AppComponent,
		BgImageComponent,
		ButtonComponent,
		IconComponent,
		InfoComponent,
		ItemComponent,
		ItemButtonComponent,
		ItemColorComponent,
		ItemLinkComponent,
		ItemStateComponent,
		ItemSwitchComponent,
		ItemWeatherComponent,
		LoadingComponent,
		PageComponent,
		SettingsComponent,
		PreventScrollDirective
	],
	providers: [
		BgWeatherImage,
		DataProvider,
		Settings,
		WebSocketService
	],
	bootstrap: [
		AppComponent
	]
})

//-----------------------------------------------------------------------------

export class AppModule { }
