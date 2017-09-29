/*
 * brief    Main app component that wraps all other components
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routeFadeAnimation } from './app.animation';

import { BgWeatherImage } from '../../services/bgWeatherImage.service';
import { DataProvider } from '../../services/dataProvider.service';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [routeFadeAnimation]
})

//-----------------------------------------------------------------------------

export class AppComponent {

	private localTime = Date.now();

	//-------------------------------------------------------------------------

	constructor(private dataProvider: DataProvider, private weatherImage: BgWeatherImage, private router: Router, public activatedRoute: ActivatedRoute ){

		// Init Data Provider
		this.dataProvider.init();

		// Init service worker
		this.initServiceWorker();

		// Update local time each second
		setInterval(()=>{
			this.localTime = Date.now();
		}, 1000);
	}

	//-------------------------------------------------------------------------

	getRoute(outlet) {
		//return this.activatedRoute.snapshot;
		return outlet.activatedRouteData.state;
	}

	//-------------------------------------------------------------------------

	onClickHomeButton() {
		this.router.navigateByUrl('/page');
	}

	//-------------------------------------------------------------------------

	onClickSettingsButton() {
		this.router.navigateByUrl('/settings');
	}

	//-------------------------------------------------------------------------

	onClickInfoButton() {
		this.router.navigateByUrl('/info');
	}

	//-------------------------------------------------------------------------

	private initServiceWorker(){

		// Register service worker
		if(process.env.ENV === 'production'){
			// Service worker can currently only be used if bundled in prod.
			// https://github.com/GoogleChrome/workbox/issues/696

			if('serviceWorker' in navigator){
				// Detailed explanation: https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
				window.addEventListener('load', function(){
					navigator.serviceWorker.register('service-worker.js').then(function(reg){
						reg.onupdatefound = function(){
							const installingWorker = reg.installing;

							installingWorker.onstatechange = function(){
								switch (installingWorker.state){
									case 'installed':
										if(navigator.serviceWorker.controller){
											console.log('New or updated content is available.');
										} else {
											console.log('Content is now available offline!');
										}
										break;

									case 'redundant':
										console.error('The installing service worker became redundant.');
										break;
								}
							};
						};
					}).catch(function(e){
						console.error('Error during service worker registration:', e);
					});
				});
			}
		}
	}
}
