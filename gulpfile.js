/*
 * brief    Gulp configuration file
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2016
 */

//-----------------------------------------------------------------------------

var gulp = require('gulp');
var plugins = {
	babelify: require('babelify'),							// https://www.npmjs.com/package/babelify
	browserify: require('browserify'),						// https://www.npmjs.com/package/browserify
	concat: require('gulp-concat'),							// https://www.npmjs.com/package/gulp-concat
	exorcist: require('exorcist'), // Source maps			// https://www.npmjs.com/package/exorcist
	glob: require('glob'),									// https://www.npmjs.com/package/glob
	gulpif: require('gulp-if'),								// https://www.npmjs.com/package/gulp-if
	mainBowerFiles: require('main-bower-files'),			// https://www.npmjs.com/package/main-bower-files
	ngannotate: require('browserify-ngannotate'),			// https://www.npmjs.com/package/browserify-ngannotate
	order: require('gulp-order'),							// https://www.npmjs.com/package/gulp-order
	runSequence: require('run-sequence'),					// https://www.npmjs.com/package/run-sequence
	sass: require('gulp-sass'),								// https://www.npmjs.com/package/gulp-sass
	sassGlob: require('gulp-sass-glob'),					// https://www.npmjs.com/package/gulp-sass-glob
	source: require('vinyl-source-stream'),					// https://www.npmjs.com/package/vinyl-source-stream
	through2: require('through2'),							// https://www.npmjs.com/package/through2
	uglifyify: require('uglifyify'),						// https://www.npmjs.com/package/uglifyify
	util: require('gulp-util'),								// https://www.npmjs.com/package/gulp-util
	uglify: require('gulp-uglify'),							// https://www.npmjs.com/package/gulp-uglify
	watchify: require('watchify')							// https://www.npmjs.com/package/watchify
};

//-----------------------------------------------------------------------------

var srcDir			= 'src',
	distDir			= 'dist',
	vendorJs		= 'home-control.vendor.min.js',
	projectJs		= 'home-control.project.min.js';

//-----------------------------------------------------------------------------

var isDeployment = false;

//-----------------------------------------------------------------------------
// Executable Tasks

gulp.task('default', function(){
	gulp.run('_build');
});

gulp.task('_build', function(){
	plugins.runSequence('welcome', ['copy', 'scripts', 'sass'], 'watch', function(){
		return plugins.util.log(plugins.util.colors.blue('I\'ve finished my work. You\'re free to take it from here, I\'ll watch your back.'));
	});
});

gulp.task('_deploy', function(){
	plugins.runSequence('set-deploy', 'welcome', ['copy', 'scripts',  'sass'], function(){
		return plugins.util.log(plugins.util.colors.blue('Everything is build and ready. Goodbye my friend.'));
	});
});

gulp.task('welcome', function(){
	if(isDeployment){
		plugins.util.log(plugins.util.colors.red('Deployment build! ') + plugins.util.colors.gray('#geilerScheiss') );
	}

	plugins.util.log(plugins.util.colors.blue('Good morning and welcome to the all new gulp process.'));
	plugins.util.log(plugins.util.colors.blue('Please don\'t forget to keep your bower up to date.'));
	plugins.util.log(plugins.util.colors.blue('Your assistent is taking over now. Sit back and enjoy the magic.'));
});

//-----------------------------------------------------------------------------

gulp.task('watch', function () {
	
	// The JS is watched from the browserify component watchify
	// Watch HTML
	gulp.watch(srcDir + '/**/*.html', ['copy-html'], function(event) {
		plugins.util.log(plugins.util.colors.yellow('File ' + event.path + ' was ' + event.type + '.'));
	});

	// Watch SASS
	gulp.watch(srcDir + '/**/*.scss', ['sass'], function(event) {
		plugins.util.log(plugins.util.colors.yellow('File ' + event.path + ' was ' + event.type + '.'));
	});
});

//-----------------------------------------------------------------------------

gulp.task('set-deploy', function() {
	isDeployment = true;
});

//-----------------------------------------------------------------------------

gulp.task('copy', ['copy-html', 'copy-fonts', 'copy-data', 'copy-img']);

//-----------------------------------------------------------------------------

gulp.task('copy-html', function(){
	return gulp.src(srcDir + '/**/*.html')
		.pipe(gulp.dest(distDir));
});

var copyFiles = function(folder, fileExtension) {
	return function(){
		return gulp.src(srcDir + '/' + (folder ? folder : '**') + '/**/' + (fileExtension ? fileExtension : '*.*'))
			.pipe(gulp.dest(distDir + '/' + (folder ? folder : '')));
	}
};

gulp.task('copy-fonts', copyFiles('fonts'));
gulp.task('copy-data', copyFiles('data'));
gulp.task('copy-img', copyFiles('img'));

//-----------------------------------------------------------------------------

gulp.task('scripts', ['scripts-project', 'scripts-vendor']);

//-----------------------------------------------------------------------------

gulp.task('scripts-project', function(){
	// Todo: We should try if webpack is not more suitable for our needs...

	var scripts = plugins.browserify(['./src/app/app.js'], {
		debug: true,
		insertGlobals: true,
		paths: ['./src/app/'],
		extensions: ['.js'],
		// required for watchify
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	scripts.transform(plugins.babelify);
	scripts.transform(plugins.ngannotate);

	if(isDeployment){
		// Todo: Uglify don't work in this configuration.
		// scripts.transform(plugins.uglifyify);
	}
	else{
		scripts = plugins.watchify(scripts);
	}

	var rebundle = function(){
		return scripts.bundle()
			.on('error', function(err){
				plugins.util.log(plugins.util.colors.red(err));
				this.emit('end');
			})
			// Create source maps
			.pipe(plugins.gulpif(!isDeployment, plugins.exorcist(distDir + '/js/' + projectJs + '.map')))
			.pipe(plugins.source(projectJs))
			.pipe(gulp.dest(distDir + '/js'));
	};

	scripts.on('update', rebundle);
	scripts.on('log', function(msg){
		plugins.util.log(plugins.util.colors.yellow(msg));
	});

	return rebundle();
});

gulp.task('scripts-vendor', function(){
	// MainBowerFiles iterates through the bower.json dependencies for vendor scripts.
	// Wrong script names can be overwritten inside the bower.json
	var vendorScripts = plugins.mainBowerFiles().filter(function (filename) {
		return filename.match(/.+\._?js$/)
	});

	var fileOrder = [
		'angular.js',
		'angular-route.js',
		'jquery.js',
		'jquery-ui.js',
		'lodash.js',
		'moment-with-locales.js',
		'moment-timezone-with-data.js',

		'**/*.js'
	];

	if(isDeployment){
		return gulp.src(vendorScripts)
			.pipe(plugins.order(fileOrder))
			.pipe(plugins.concat(vendorJs))
			.pipe(plugins.uglify({
				preserveComments: 'none'
			}))
			.pipe(gulp.dest(distDir + '/js'));
	}
	else{
		var initial = true;
		return gulp.src(vendorScripts)
			.pipe(plugins.order(fileOrder))
			.pipe(plugins.through2.obj(function(chunk, enc, cb){
				if(initial){
					plugins.util.log(plugins.util.colors.blue('I have crawled the following vendor script (in order of integration):'));
					initial = false;
				}

				plugins.util.log(plugins.util.colors.gray(chunk.path.replace(/,/g, '\n')));
				cb(null, chunk)
			}))
			.pipe(plugins.concat(vendorJs))
			.pipe(gulp.dest(distDir + '/js'));
	}
});

//-----------------------------------------------------------------------------

gulp.task('sass', function(){
	return gulp.src(srcDir + '/style/*.scss')
		.pipe(plugins.sassGlob())
		.pipe(plugins.sass.sync().on('error', plugins.sass.logError))
		.pipe(gulp.dest(distDir + '/style'));
});
