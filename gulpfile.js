var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    opts = {args: args},
    config = {
        host: 'localhost:3000',
        rootDir: __dirname,

        jsDir: './src/js',
        sassDir: './src/sass',

        vendorDir: './vendor',
        distDir: './dist',

        noStackTrace: true
    };

opts['config'] = config;

require('./gulp/browserify')(gulp, opts, $);
require('./gulp/bower-copy')(gulp, opts, $);
require('./gulp/sass')(gulp, opts, $);
require('./gulp/jest')(gulp, opts, $);

gulp.task('default',['sass', 'browserify']);
gulp.task('watch', ['watch-browserify', 'watch-sass']);
gulp.task('test', ['jest']);
gulp.task('test-one', ['watch-jest']);
