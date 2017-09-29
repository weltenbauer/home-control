/*
 * brief    Define routes
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     August 2017
 */

//-----------------------------------------------------------------------------

import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './components/routes/page/page.component';
import { SettingsComponent } from './components/routes/settings/settings.component';
import { InfoComponent } from './components/routes/info/info.component';

//-----------------------------------------------------------------------------

const routes: Routes = [
	{ path: 'page', component: PageComponent, data: { state: 'page' } },
	{ path: 'page/:id', component: PageComponent, data: { state: 'page' }},
	{ path: 'settings', component: SettingsComponent, data: { state: 'settings' }  },
	{ path: 'info', component: InfoComponent, data: { state: 'info' }  },
	{ path: '', redirectTo: '/page', pathMatch: 'full' }
];

//-----------------------------------------------------------------------------

export const Routing = RouterModule.forRoot(routes);
