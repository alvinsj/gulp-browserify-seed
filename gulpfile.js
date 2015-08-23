var gulp = require('gulp'),
 
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    chalk = gutil.colors;

var build = function(watch, watchCallback){
    var b = browserify({
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        paths: ["src/js"],
        extension: ['js']
    });
    b.transform(babelify);
    b = watch ? watchify(b) : b;
    b.add('./src/js/index.js');

    var rebundle = function(){
        return b.bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('./dist/'));
    }

    b.on('update', function(path){
        gutil.log(chalk.magenta('rebundling...'));
        rebundle();
    });

    b.on('time', function(time){
        gutil.log(chalk.black.bgGreen("Finished 'rebundle()' after " + time + " ms"));
        watchCallback();
    });

    return rebundle();
}

gulp.task('default', ['browserify']);
gulp.task('watch', ['watchify']);
gulp.task('browserify', function(){
    return build(false);
});
gulp.task('watchify', function(){
    return build(true, function(){
    });
});


