/*
 * brief    ItemLink component
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     February 2017
 */

//-----------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLink } from '../../../../logic/models/items/itemLink.model';

//-----------------------------------------------------------------------------

@Component({
	selector: 'hc-item-link',
	templateUrl: 'itemLink.component.html',
	styleUrls: ['../item.component.scss']
})
export class ItemLinkComponent {

	@Input() item : ItemLink;

	//-------------------------------------------------------------------------

	constructor(private router : Router){}

	//-------------------------------------------------------------------------

	openTarget(){
		this.router.navigateByUrl('/page/' + this.item.getTarget());
	}
}
