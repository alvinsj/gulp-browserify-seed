var sequence = require('run-sequence');
var color = require('cli-color');

module.exports = function(gulp, opts, $){
    var config = opts.config;

    gulp.task('sass', function(cb){
        sequence('bower-copy', 'ruby-sass', cb);
    });

    gulp.task('watch-sass', ['css-rebundle'], function() {
        return gulp.watch(
            [config.sassDir+'/**/*.scss'],
            ['css-rebundle']);
    });

    gulp.task('css-rebundle', function(cb){
        sequence('ruby-sass', function(){
            hightlight("Finished bundling for \'watch-sass\'");
            cb.apply(null, arguments);
        });
    });

    gulp.task('ruby-sass', function() {
        return $.rubySass(config.sassDir+'/style.scss',
            {
                sourcemap: true,
                loadPath: [
                    config.sassDir,
                    config.vendorDir +'/bower_components/bootstrap/scss',
                    config.vendorDir +'/bower_components/fontawesome/scss',
                ]
            })
            .pipe($.autoprefixer('last 2 version'))
            .pipe($.sourcemaps.write({sourceRoot: config.sassDir}))
            .pipe($.rename('bundle.css'))
            .pipe(gulp.dest(config.distDir+'/css/'));
    });

    function hightlight(prefix){
        var c = ['bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
        var r = Math.floor(Math.random() * 7);
        var e = color.black[c[r]](prefix);
        $.util.log(e);
    }
}
