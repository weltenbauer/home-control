/*
 * brief    Define routes
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './components/route-page/page.component';
import { SettingsComponent } from './components/route-settings/settings.component';

//-----------------------------------------------------------------------------

const routes: Routes = [
	{ path: 'page', component: PageComponent },
	{ path: 'page/:id', component: PageComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: '', redirectTo: '/page', pathMatch: 'full' }
];

//-----------------------------------------------------------------------------

export const Routing = RouterModule.forRoot(routes);
