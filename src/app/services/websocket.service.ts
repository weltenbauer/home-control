

import { Injectable } from '@angular/core';

import * as atmosphere from 'atmosphere.js';

@Injectable()
export class WebSocketService {

	public connect() {

		/*let request = {
			url: 'ws://home-control:8080/rest/items',
			//url: 'http://home-control:8080/rest/sitemapsss?sitemap=homecontrol&poll=true',
			contentType: 'application/json',
			headers: {"Accept": "application/json", "type": "json"},
			logLevel: 'debug',
			transport: 'websocket',
			attachHeadersAsQueryString: true,

			onOpen: (response) => {
				console.log('OnOpen', response);
			},
			onMessage: (response) => {
				console.log('onMessage', response);
			},
			onClose: (response) => {
				console.log('onClose', response);
			},
			onError: (response) => {
				console.error('onError', response);
			}
		};

		atmosphere.subscribe(request);*/

	}
}
