/*
 * brief    Background image of the application
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     September 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//-----------------------------------------------------------------------------

@Component({
  selector: 'hc-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss']
})
export class BgImageComponent {

	@Input('image') image : BehaviorSubject<string> = new BehaviorSubject('./backgrounds/sunny01.jpg');
	private imageUrl : string = '';

	//-------------------------------------------------------------------------

	ngOnInit() {
		this.image.subscribe((data : string) => {
			this.imageUrl = 'url(' + data + ')';
		});
	}

	//-------------------------------------------------------------------------

	ngOnDestroy() {
		this.image.unsubscribe();
	}
}
