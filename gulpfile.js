var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var notify = require( 'gulp-notify' );
var livereload = require('gulp-livereload');


gulp.task('less', function () {
  return gulp.src('less/style.less')
    .pipe( less().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) ))
    .pipe(rename('style-less.css'))
    .pipe(gulp.dest('css/'))
});
 
gulp.task('default', ['less'], function () {
  return gulp.src('css/*.css')
  	.pipe(autoprefixer({
			browsers: ['> 1%','last 3 versions'],
			cascade: false
		}))
    .pipe(concatCss('bundle.css')).on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "concatCSS Error!"
      } ) )
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('out/'))
		.pipe(livereload())
     notify ({
      message: "Done",
      title  : "Sass ok!"
    });
});

gulp.task('watch',function() {
  gulp.watch('less/**/*.less', ['default']);
  //gulp.watch('css/**/*.css', ['default']);
  livereload.listen();
 // gulp.watch('*.html', ['less'], ['default']);
});

