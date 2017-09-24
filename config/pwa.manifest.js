/*
 * brief    Progressive webapp manifest definition
 * author   Marc Grützmacher (marc.gruetzmacher@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     August 2017
 */

//-----------------------------------------------------------------------------

const path = require('path');

//-----------------------------------------------------------------------------

module.exports = {
	name: 'Home-Control',
	short_name: 'HomeControl',
	description: 'A SmartHome User-Interface based on HTML5.',
	start_url: 'index.html?launcher=true',
	background_color: '#ffffff',
	theme_color: '#ffffff',
	display: 'standalone',
	related_applications: [{
		"platform": "web"
	}],
	icons: {
		src: path.resolve('src/assets/icon.png'),
		sizes: [48, 72, 96, 144, 168, 192, 256, 384, 512],
		destination: path.join('assets', 'icons')
	}
};
