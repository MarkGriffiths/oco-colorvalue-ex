/*
 * Gulp User Tasks
 */

const gulp = require('gulp')
const rename = require('gulp-rename')
const strip = require('gulp-strip-comments')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')

const external = ['@thebespokepixel/es-tinycolor', 'chroma-js', 'color-convert', 'opencolor']

const babelConfig = {
	presets: [
		['@babel/preset-env', {
			modules: false,
			targets: {
				node: '8.0.0'
			}
		}]
	],
	exclude: 'node_modules/**'
}

gulp.task('cjs', () =>
	gulp.src('src/index.js')
		.pipe(rollup({
			external,
			plugins: [babel(babelConfig)]
		}, {
			format: 'cjs'
		}))
		.pipe(strip())
		.pipe(gulp.dest('.'))
)

gulp.task('es6', () =>
	gulp.src('src/index.js')
		.pipe(rollup({
			external,
			plugins: [babel(babelConfig)]
		}, {
			format: 'es'
		}))
		.pipe(strip())
		.pipe(rename('index.mjs'))
		.pipe(gulp.dest('.'))
)

gulp.task('default', gulp.series('cjs', 'es6'))

/* Old version
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', cordial.macro({
	babel: {
		plugins: ['external-helpers']
	},
	source: 'src/index.js'
}).basic())

gulp.task('master', cordial.macro({
	master: true,
	babel: {
		plugins: ['external-helpers']
	},
	source: 'src/index.js'
}).basic())

// Docs
gulp.task('docs', cordial.shell({
	source: 'npm run doc-build'
}).job())

// ReadMe
gulp.task('readme', cordial.shell({
	source: 'npm run readme'
}).job())

// Clean
gulp.task('clean', cordial.shell({
	source: ['npm-debug.*', './.nyc_output', './test/coverage']
}).trash())

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/**.js']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Hooks
gulp.task('start-release', gulp.series('reset', 'clean', 'master', 'readme'))
gulp.task('post-flow-release-start', gulp.series('start-release', 'version-release', 'docs', 'commit'))

// Default
gulp.task('default', gulp.series('bump', 'clean', gulp.parallel('docs', 'bundle', 'readme')))
*/
