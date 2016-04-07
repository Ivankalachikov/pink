var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css/'))
});
 
gulp.task('default', ['less'], function () {
  return gulp.src('css/*.css')
  	.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('out/'))
});

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['default']);
  gulp.watch('css/**/*.css', ['default']);
 // gulp.watch('*.html', ['less'], ['default']);
});

