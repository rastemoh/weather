var gulp  = require('gulp'),
    gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify');
var paths = {
	htmlSrc:'src/app/**/*.html',
	htmlDest:'build/html',
	jsSrc:'src/app/**/*.js',
	jsDest:'build/js',
	sassSrc:'src/style/*.scss',
	sassFile:'src/style/app.scss',
	sassDest:'build/css/',
	jsLibDest:'lib/js'
}

gulp.task('compile-sass',function(){
	gutil.log("Compiling sass files");
	return gulp.src(paths.sassFile)
		.pipe(sourcemaps.init())  // Process the original sources
		// .pipe(sass())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(sourcemaps.write()) // Add the map to modified source.
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.sassDest));
});

gulp.task('css',['compile-sass'],function(){//dont use it now
	return gulp.src(paths.cssSrc)
		.pipe(concat('app.css'))
		.pipe(gulp.dest(paths.cssDest));
})

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('build-js',function(){
	gutil.log('Concat and copy js files');
	return gulp.src(paths.jsSrc)
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		//only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.jsDest));
});

gulp.task('copy-js-lib',function(){
	var src = [
		"node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js",
		"node_modules/toastr/build/toastr.min.js",
		"node_modules/moment/min/moment.min.js"
	]
	return gulp.src(src)
		.pipe(gulp.dest(paths.jsLibDest))
});
gulp.task('copy-html', function() {
	// copy any html files in source/ to public/
	gutil.log('Copying HTML Files');
	gulp.src(paths.htmlSrc).pipe(gulp.dest(paths.htmlDest));
});

gulp.task('build',['build-js','copy-html'],function(){

});
gulp.task('build-watch', function() {
	gulp.watch(paths.htmlSrc, ['copy-html']);
	gulp.watch(paths.jsSrc, ['build-js']);
	gulp.watch(paths.sassSrc, ['compile-sass']);
});