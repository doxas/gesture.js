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

gulp.task('build', function(){
	return gulp.src('./gesture.js')
		.pipe($.uglify())
		//.pipe($.concat('gesture_min.js'))
		.pipe(gulp.dest('./build'));
});

// other task
gulp.task('reload', function(){
	return browserSync.reload();
});

gulp.task('watch', function(){
	gulp.watch(['./'], ['build', 'reload']);
});

gulp.task('test', function(){
	runSequence(
		'jslint',
		'build',
		'watch',
		'browserSync'
	);
});

gulp.task('default', ['test']);


