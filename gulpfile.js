const gulp = require('gulp');

exports.default = gulp.series(
  gulp.parallel(css),
  watchUpdates
);
exports.css = css;

