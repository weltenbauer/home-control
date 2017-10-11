/*
 * brief    Util functions
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     September 2017
 */

//-----------------------------------------------------------------------------

export const Util = {
	randomNumber: (nr: number) => {
		return Math.floor(Math.random() * nr);
	}
};
