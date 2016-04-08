var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
 var gls = require('gulp-live-server');
 var notify = require( 'gulp-notify' );

gulp.task('serve', function() {
  //1. serve with default settings 
  var server = gls.static(); //equals to gls.static('public', 3000); 
  server.start();
  gulp.watch(['**/*.css', '*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});

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
});

gulp.task('watch', ['serve'],function() {
  gulp.watch('less/**/*.less', ['default']);
  gulp.watch('css/**/*.css', ['default']);
 // gulp.watch('*.html', ['less'], ['default']);
});

