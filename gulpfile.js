const gulp          = require('gulp');
const sass          = require('gulp-sass');
const nodemon       = require('nodemon');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const plumber       = require('gulp-plumber');
const browserSync   = require('browser-sync');
const autoprefixer  = require('gulp-autoprefixer');

gulp.task('default',['sass', 'scripts', 'imgs', 'browserSync'], function() {})

gulp.task('sass', function() {
  return gulp.src('./src/sass/main.sass')
          .pipe(sass().on('error', sass.logError))
          .pipe(plumber())
          .pipe(autoprefixer({
            browser: ['last 2 versions'],
            cascade: false
          }))
          .pipe(gulp.dest('./public/css/'))
          .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
          .pipe(plumber())
          // .pipe(uglify())
          .pipe(babel({
            presets: ['es2015']
          }))
          .pipe(gulp.dest('./public/js/'))
          .pipe(browserSync.reload({stream: true}))
});

gulp.task('imgs', function() {
  return gulp.src('./src/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/imgs/'));
})

gulp.task('browserSync', ['nodemon'], function(){

  browserSync.init( null, {
    proxy: 'http://localhost:3000',
    files: ['view/index.pug'],
    browser: 'google chrome',
    port: 7000
  });

  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./**/*.pug').on('change', browserSync.reload);
});

gulp.task('nodemon', function(cb) {
  var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {

		if (!started) {
			cb();
			started = true;
		}
	});
});
