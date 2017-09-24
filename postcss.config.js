// More information about plugins and configuration:
// https://github.com/postcss/postcss#plugins

module.exports = {
	plugins: {
		'autoprefixer': {browsers: ['last 2 versions', 'ie <= 8']},
		'postcss-flexibility': {},
		'postcss-normalize': {},
		'cssnano': {minimize: true}
	}
};
