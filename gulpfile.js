var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-clean-css');
var embedlr = require('gulp-embedlr');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');


gulp.task('scripts', function() {
    gulp.src(['app/js/script.js'])
        .pipe(browserify())
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {
    gulp.src(['app/css/style.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(server))
})

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
})

gulp.task('html', function() {
    gulp.src("app/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(server));
})

gulp.task('watch', function() {
      gulp.watch('app/src/**/*.js', gulp.series('scripts'));
      gulp.watch('app/css/style.less', gulp.series('styles'));
      gulp.watch('app/*.html', gulp.series('html'));
});
