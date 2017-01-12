/*
 * brief    Define routes
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/route-main/main.component';
import { SettingsComponent } from './components/route-settings/settings.component';

//-----------------------------------------------------------------------------

const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'settings', component: SettingsComponent}
];

//-----------------------------------------------------------------------------

export const Routing = RouterModule.forRoot(routes);
