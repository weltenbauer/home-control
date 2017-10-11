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
export class BgImageComponent implements OnInit, OnDestroy{

	@Input('image') imageStream: BehaviorSubject<string>;

	private imageUrl = '';
	private bgVisible = false;
	private fadingTime = 1500;

	private imageStreamHandle = null;

	//-------------------------------------------------------------------------

	ngOnInit() {
		this.imageStreamHandle = this.imageStream.subscribe((data: string) => {
			this.bgVisible = false;
			setTimeout(()=>{
				this.imageUrl = data;
			}, this.fadingTime);
		});
	}

	//-------------------------------------------------------------------------

	ngOnDestroy() {
		this.imageStreamHandle.unsubscribe();
	}

	//-------------------------------------------------------------------------

	onBgImageLoaded(){
		this.bgVisible = true;
	}
}
