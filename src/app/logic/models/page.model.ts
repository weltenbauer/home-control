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
	public label : string = '';
	public sections : Section[] = [];
}