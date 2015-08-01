// load plugin
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),
	browserSync = require('browser-sync'),
	runSequence = require('run-sequence');

// browser sync
gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: './'
		}
	});
});

// js
gulp.task('jslint', function(){
	return gulp.src('./gesture.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter());
});

gulp.task('buildjs', function(){
	return gulp.src('./')
		.pipe($.uglify())
		.pipe($.concat('gesture_min.js'))
		.pipe(gulp.dest(paths.destDir));
});

// other task
gulp.task('reload', function(){
	return browserSync.reload();
});

gulp.task('watch', function(){
	gulp.watch([paths.htmlDir], ['copy', 'reload']);
	gulp.watch([paths.cssDir], ['copy', 'reload']);
	gulp.watch([paths.jsDir], ['concatjs', 'reload']);
});

gulp.task('test', function(){
	runSequence(
		'jslint',
		'concatjs',
		'watch',
		'browserSync'
	);
});

gulp.task('default', ['test']);


