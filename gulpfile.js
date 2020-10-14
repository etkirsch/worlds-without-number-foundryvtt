const gulp = require('gulp')
const sass = require('gulp-sass')

function compileScss () {
	return gulp
		.src('./styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
}

function watchUpdates () {
	gulp.watch('./styles/**/*.scss', gulp.series(compileScss))
}

exports.default = gulp.series(
	compileScss,
  watchUpdates
)
