
// Helper: fullPath() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//-----------------------------------------------------------------------------

var ouputPath = 'dist';

//-----------------------------------------------------------------------------

// Get environment
var environement = process.env.NODE_ENV.trim();
var isProduction = (environement === 'production');

// Log
console.log('====================================================');
console.log('Start Webpack process in environment ' + environement);
console.log('====================================================\n');

//-----------------------------------------------------------------------------

function createWebpackConfig() {
	
	var config = {};

	// Sourcemap
	config.devtool = isProduction ? 'source-map' : 'cheap-module-source-map';
	
	// Starpoints
	config.entry = {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts'
	};

	// Output setup
	config.output = {
		path: fullPath(ouputPath),
		publicPath: isProduction ? '/' : 'http://localhost:8080/',
		filename: isProduction ? 'js/[name].[hash].js' : 'js/[name].js',
		chunkFilename: isProduction ? '[id].[hash].chunk.js' : '[id].chunk.js'
	};
	
	// Resolve filenames
	config.resolve = {
		extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
	};
	
	// Dev Server
	config.devServer = {
		contentBase: fullPath('src', 'public'),
		historyApiFallback: true,
		quiet: false,
		stats: 'normal'
	};
	
	// Set Target
	config.target = 'web';
	
	//-------------------------------------------------------------------------

	// Loaders
	config.module = {
		rules: [
		
			// Support for .ts files.
			{
				test: /\.ts$/,
				exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/, /container/],
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			
			// TS Lint
			{
				test: /\.ts$/,
				enforce: 'pre',
				loader: 'tslint-loader'
			},

			// copy those assets to output
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
			},

			// Support for *.json files.
			{
				test: /\.json$/,
				loader: 'json-loader'
			},

			//-----------------------------------------------------------------
			
			// Main styles in './src/style' folder
			
			{
				test: /\.css$/,
				include: fullPath('src', 'style'),
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.(scss|sass)$/,
				include: fullPath('src', 'style'),
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'postcss-loader', 'sass-loader']
                })
			},
			
			//-----------------------------------------------------------------
			
			// Component Styles in './src/app' folder
			
			{
				test: /\.css$/, 
				include: fullPath('src', 'app'), 
				loader: ['raw-loader', 'postcss-loader']
			},
			{
				test: /\.(scss|sass)$/, 
				include: [fullPath('src', 'app')],
				loader: ['raw-loader', 'postcss-loader', 'sass-loader']
			},

			//-----------------------------------------------------------------
			
			{
				test: /\.html$/, 
				include: [fullPath('src', 'app')],
				loader: 'raw-loader'
			}
		]
	};
	
	//-------------------------------------------------------------------------

	// Plugins
	config.plugins = [
		
		// Define env variables to help with builds
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(environement)
			}
		}),

		// Workaround needed for angular 2 angular/angular#11580
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			fullPath('./src') // location of your src
		),

		// Tslint configuration for webpack 2
		new webpack.LoaderOptionsPlugin({
			options: {
				
				tslint: {
					emitErrors: false,
					failOnHint: false
				},
				
				postcss: [
					autoprefixer({
						browsers: ['last 2 version']
					})
				]
			}
		}),
	
		// Generate common chunks if necessary
		new CommonsChunkPlugin({
			name: ['vendor', 'polyfills']
		}),

		// Inject script and link tags into html files
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
			chunksSortMode: 'dependency'
		}),

		// Extract css files
		new ExtractTextPlugin({
			filename: isProduction ? 'css/styles.[hash].css' : 'css/styles.css',
			disable: false, 
			allChunks: true
		})
	];
	
	//-------------------------------------------------------------------------

	// Add build specific plugins
	if (isProduction) {
		config.plugins.push(
		
			// Only emit files when there are no errors
			new webpack.NoErrorsPlugin(),

			// Minify all javascript, switch loaders to minimizing mode
			new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),

			// Copy assets from the public folder
			new CopyWebpackPlugin([{
				from: fullPath('src', 'public', 'img'),
				to: fullPath(ouputPath, 'img')
			}])
		);
	}

	return config;
};

//-----------------------------------------------------------------------------

// Helper function
function fullPath(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}

//-----------------------------------------------------------------------------

module.exports = createWebpackConfig();
