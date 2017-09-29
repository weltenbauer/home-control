/*
 * brief    Main app component animation
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     September 2017
 */

//-----------------------------------------------------------------------------

import { trigger, animate, transition, style, query } from '@angular/animations';

//-----------------------------------------------------------------------------

export const routeFadeAnimation = trigger('routeFadeAnimation', [
	transition( '* => *', [

		query(':enter',
			[
				style({ opacity: 0, position: 'absolute', height: '80%' })
			],
			{ optional: true }
		),

		query(':leave',
			[
				style({ opacity: 1 }),
				animate('0.3s', style({ opacity: 0 }))
			],
			{ optional: true }
		),

		query(':enter',
			[
				style({ opacity: 0 }),
				animate('0.3s', style({ opacity: 1 }))
			],
			{ optional: true }
		)
	])
]);
