/*
 * brief    Button component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     October 2017
 */

//-----------------------------------------------------------------------------

import { Component, Output, EventEmitter } from '@angular/core';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})

//-----------------------------------------------------------------------------

export class ButtonComponent {

	@Output('onClick') onClick = new EventEmitter<any>();

	//-------------------------------------------------------------------------

	click(){
		this.onClick.emit();
	}
}
