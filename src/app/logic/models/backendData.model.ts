/*
 * brief    Provide access to item and structure data to the current choosen backend
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     January 2016
 */

//-----------------------------------------------------------------------------

export class BackendData {

	public name : string = '';
	public type : string = '';
	public url : string = '';
	public username : string = '';
	public password : string = '';
	public metaData : any;

	//-------------------------------------------------------------------------

	public getUrl(){

		// Copy original url
		let url = this.url;

		// Check protocol
		if(!this.url.includes('://')){
			url += 'http://' + url;
		}

		// Add username and password
		if(this.username !== '' && this.password !== ''){
			url.replace('://', '://' + this.username + '@' + this.password);
		}

		return url;
	}
}
