Commonly used [gulp](https://github.com/gulpjs/gulp) + [browserify](https://github.com/substack/node-browserify) configuration.

## Usage
```bash
$ gulp
$ gulp watch
```

## Optional
```bash
$ gulp bower-copy
$ gulp test # with jest
$ gulp sass
```

## Exploring gulpfile.js
```javascript
var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    opts = {args: args},
    
    // specify directory structures
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

// tasks: remove tasks if not needed 
require('./gulp/browserify')(gulp, opts, $);
require('./gulp/bower-copy')(gulp, opts, $);
require('./gulp/sass')(gulp, opts, $);
require('./gulp/jest')(gulp, opts, $);

// tasks: remove tasks if not needed
gulp.task('default',['sass', 'browserify']); 
gulp.task('watch', ['watch-browserify', 'watch-sass']); 
gulp.task('test', ['jest']);
gulp.task('test-one', ['watch-jest']);
```
