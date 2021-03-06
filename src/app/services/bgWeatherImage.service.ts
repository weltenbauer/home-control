/*
 * brief    Manage the rotation of the background image depending on the local weather condition
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Util } from '../misc/util';

//-----------------------------------------------------------------------------

@Injectable()
export class BgWeatherImage {

	private bgImages = {
		fog: ['fog01.jpg', 'fog02.jpg', 'fog03.jpg'],
		sunny: ['sunny01.jpg'],
		morning: ['morning01.jpg', 'morning02.jpg'],
		cloudy: ['cloudy01.jpg'],
		night: ['night01.jpg', 'night02.jpg']
	};

	private imagePath = './backgrounds/';
	private imageSubject = new BehaviorSubject(this.imagePath + this.bgImages.fog[0]);

	//-------------------------------------------------------------------------

	constructor(){
		setTimeout(()=>{
			this.setBackground('morning');
		}, 6000);
		setTimeout(()=>{
			this.setBackground('cloudy');
		}, 12000);
		setTimeout(()=>{
			this.setBackground('fog');
		}, 18000);
		setTimeout(()=>{
			this.setBackground('night');
		}, 24000);
	}

	//-------------------------------------------------------------------------

	public getCurrentImageUrlSubject(){
		return this.imageSubject;
	}

	//-------------------------------------------------------------------------

	public setBackground(weatherCondition: string){
		let imageUrl = this.bgImages[weatherCondition][Util.randomNumber(this.bgImages[weatherCondition].length)];
		this.imageSubject.next(this.imagePath + imageUrl);
	}
}
