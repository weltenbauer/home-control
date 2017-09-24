/*
 * brief    Webpack development definition
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

//-----------------------------------------------------------------------------

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {

	devtool: 'cheap-module-eval-source-map',

	//-------------------------------------------------------------------------

	output: {
		path: helpers.root('dist'),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	//-------------------------------------------------------------------------

	plugins: [
		new ExtractTextPlugin('[name].css'),

		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	],

	//-------------------------------------------------------------------------

	devServer: {
		historyApiFallback: true,
		stats: 'minimal',
		host: '0.0.0.0'
	}
});
