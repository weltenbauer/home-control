/*
 * brief    Data Model for pages
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

import { Section } from './section.model';

//-----------------------------------------------------------------------------

export class Page {
	public id: string = '';
	public title: string = '';
	public sections: Section[] = [];
	public metaData: any;
	public parentPage: Page = null;
}
