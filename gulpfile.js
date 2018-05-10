var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var babel = require('gulp-babel');



gulp.task('default', ['styles','copy-html-sw','scripts'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch(['./index.html','./restaurant.html','./sw.js'],['copy-html-sw']);
	gulp.watch('./js/**/*.js',['scripts']);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('minify-img', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
);

gulp.task('copy-html-sw', function(){
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
	gulp.src('./restaurant.html')
			.pipe(gulp.dest('./dist'));
	gulp.src('./sw.js')
			.pipe(gulp.dest('./dist'));
});

gulp.task('scripts',function(){
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));

	});

gulp.task('scripts-dist',function(){
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
	});
