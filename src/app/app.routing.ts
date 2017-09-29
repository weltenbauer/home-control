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
	{ path: 'page', component: PageComponent },
	{ path: 'page/:id', component: PageComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'info', component: InfoComponent },
	{ path: '', redirectTo: '/page', pathMatch: 'full' }
];

//-----------------------------------------------------------------------------

export const Routing = RouterModule.forRoot(routes);
