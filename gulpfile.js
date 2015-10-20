var gulp = require('gulp');
var psi = require('psi');
var minifyCss = require('gulp-minify-css');
var inlineCss = require('gulp-inline-css');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');

var site = 'http://5bdb5fed.ngrok.com';
var key = '';

// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v1/getting_started

// PageSpeed INSIGHTS TASKS
gulp.task('mobile', function () {
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }, function (err, data) {
        console.log(data.score);
        console.log(data.pageStats);
    });
});

gulp.task('desktop', function () {
    return psi(site, {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }, function (err, data) {
        console.log(data.score);
        console.log(data.pageStats);
    });
});


// CSS TASKS
gulp.task('min-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('inline-css', function() {
    return gulp.src('index.html')
        .pipe(inlineCss(''))
        .pipe(gulp.dest(''));
});

// gulp.task('default', ['mobile']);

// gulp.task('default', function() {
//     gulp.run('lr-server', 'scripts', 'styles', 'html');

//     gulp.watch('app/src/**', function(event) {
//         gulp.run('scripts');
//     })

//     gulp.watch('app/css/**', function(event) {
//         gulp.run('styles');
//     })

//     gulp.watch('app/**/*.html', function(event) {
//         gulp.run('html');
//     })
// })
