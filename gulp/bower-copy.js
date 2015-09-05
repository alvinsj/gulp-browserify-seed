var sequence = require('run-sequence');

module.exports = function(gulp, opts, $){
    var config = opts.config;
    var bowerDir = 'bower_components';
    var bowerPath = config.vendorDir+'/'+bowerDir;

    gulp.task('bower-copy', function(cb){
        sequence('bower', ['bootstrap-js', 'bootstrap-icons', 'fontawesome'], cb);
    });

    gulp.task('bower', function(){
        return $.bower({
            directory: bowerDir,
            cwd: config.vendorDir
        });
    });

    gulp.task('fontawesome', function() {
        return gulp
        .src(bowerPath + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(config.distDir+'/fonts'));
    });

    gulp.task('bootstrap-icons', function() {
        return gulp
        .src(bowerPath + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest(config.distDir+'/fonts'));
    });

    gulp.task('bootstrap-js', function() {
        return gulp
        .src(bowerPath + '/bootstrap-sass-official/assets/javascripts/bootstrap.js')
        .pipe(gulp.dest(config.distDir+'/js'));
    });

}
