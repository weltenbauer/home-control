/*
 * brief    Webpack production definition
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

//-----------------------------------------------------------------------------

// Set production env var
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

//-----------------------------------------------------------------------------

module.exports = webpackMerge(commonConfig, {

	devtool: false,

	//-------------------------------------------------------------------------

	output: {
		path: helpers.root('dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].chunk.js'
	},

	//-------------------------------------------------------------------------

	plugins: [

		new webpack.NoEmitOnErrorsPlugin(),

		new ExtractTextPlugin('[name].[chunkhash].css'),

		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),

		new webpack.LoaderOptionsPlugin({
			htmlLoader: {
				minimize: false // workaround for ng2
			}
		}),

		// Strip comments in base css (component styles are not affected)
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
				safe: true,
				discardComments: {
					removeAll: true
				}
			}
		}),

		// Extract comments to extra files
		new UglifyJsPlugin({
			extractComments: true
		})
	]
});
