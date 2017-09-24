/*
 * brief    Manage the rotation of the background image depending on the local weather condition
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Injectable } from '@angular/core';

//-----------------------------------------------------------------------------

@Injectable()
export class BgWeatherImage {

	private bgImages = {
		fog: ['fog01.jpg'],
		sunny: ['sunny01.jpg']
	};

	//-------------------------------------------------------------------------

	public getCurrentImageUrl(){

		return '';
	}

	//-------------------------------------------------------------------------

	public setBackground(weatherCondition : string){

	}
}
