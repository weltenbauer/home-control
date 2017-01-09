import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

import '../../style/app.scss';

@Component({
	selector: 'hc-my-app', // <my-app></my-app>
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	url = 'http://www.weltenbauer-se.com';

	constructor(private api: ApiService) {
		// Do something with api
	}
}
