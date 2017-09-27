/*
 * brief    Webpack common definition
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

var webpack = require('webpack');
var manifest = require('./pwa.manifest');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//-----------------------------------------------------------------------------

module.exports = {

	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts'
	},

	//-------------------------------------------------------------------------

	resolve: {
		extensions: ['.ts', '.js']
	},

	//-------------------------------------------------------------------------

	module: {
		rules: [
			{
				test: /\.ts$/,
				include: helpers.root('src'),
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: helpers.root('tsconfig.json') }
					} , 'angular2-template-loader'
				]
			},
			{
				test: /\.html$/,
				include: helpers.root('src'),
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico|json)$/,
				exclude: [helpers.root('src', 'assets', 'fonts'), helpers.root('src', 'assets', 'backgrounds')],
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[hash].[ext]'
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include: [helpers.root('src', 'assets', 'backgrounds')],
				loader: 'file-loader',
				options: {
					name: 'backgrounds/[name].[ext]'
				}
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg)$/,
				include: helpers.root('src', 'assets', 'fonts'),
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]'
				}
			},
			{
				test: /\.scss$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract({
					loader: [
						{loader: 'raw-loader'},
						{loader: 'postcss-loader'}, // Config: ./postcss.config.js
						{loader: 'sass-loader'}
					]
				})
			},
			{
				test: /\.scss$/,
				include: helpers.root('src', 'app'),
				use: [
					{loader: 'raw-loader'},
					{loader: 'postcss-loader'}, // Config: ./postcss.config.js
					{loader: 'sass-loader'}
				]
			}
		]
	},

	//-------------------------------------------------------------------------

	plugins: [

		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)@angular/,
			helpers.root('./src'), // location of your src
			{} // a map of your routes
		),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new WebpackPwaManifest(manifest),

		// Todo: change urlPattern to correct url
		new SWPrecacheWebpackPlugin({
			cacheId: 'home-control-online',
			filename: 'service-worker.js',
			maximumFileSizeToCacheInBytes: 4194304,
			staticFileGlobsIgnorePatterns: [/\.json/, /\.map/, /\.xml/],
			runtimeCaching: [
				{
					handler: 'fastest',
					urlPattern: /^https:\/\/(www\.)?my-awesome-site.com$/
				}
			]
		}),

		// Copy icons and fonts
		new CopyWebpackPlugin([
			{ from: helpers.root('src', 'assets', 'icons'), to: 'assets' },
			{ from: helpers.root('src', 'assets', 'fonts'), to: 'assets' }
		])
	]
};
