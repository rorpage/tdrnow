var indexOutput     = 'index.html';
var staticFolders   = ['src/img/*','src/fonts/*', 'src/js/vendor/*', 'src/index.html'];
var favicon         = ['src/favicon/*'];

var gulp        = require('gulp')
var sass        = require('gulp-ruby-sass'); 
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify'); 
var concat      = require('gulp-concat'); 
var del         = require('del');
var minifyCss   = require('gulp-minify-css');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var gutil       = require('gulp-util');
var server      = require('gulp-server-livereload');

var paths = {
    npm: './node_modules/',
    css: {
        base: 'src/css/',
        vendor: 'src/css/vendor/',
        dist: 'dist/css/'
    },
    js: {
        base: 'src/js/',
        vendor: 'src/js/vendor/',
        react: 'src/js/react/ui/',
        dist: 'dist/js/'
    }
};

var vendorJs = [
    paths.npm + 'jquery/dist/jquery.min.js',
    paths.npm + 'foundation-sites/dist/foundation.min.js',
    paths.npm + 'moment/min/moment.min.js',
    paths.npm + 'moment-timezone/builds/moment-timezone.min.js',
    paths.npm + 'fastclick/lib/fastclick.js'
];

var reactApps = [
    'react-app.js'
];

var dependencies = [
    'react'
];

var mainAppFile = 'app.js';

/**
 * Builds
 */
gulp.task('default', ['build', 'watch', 'browserify-watch']);

gulp.task('build', ['clean'], function() {
    gulp.start(
        'sass',
        'browserify',
        'js-vendor',
        'copy-static-assets',
        'copy-favicon'
    );
});

/**
 * Watch tasks for sass and browserify
 */
gulp.task('watch', function(){
    gulp.watch(paths.css.base + '**/*', ['sass']);
});


gulp.task('browserify-watch', function(){
    var bundler = watchify(browserify(paths.js.base + mainAppFile));
    bundler.external(dependencies);
    bundler.transform(babelify)
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.red(err.toString()));
            })
            .on('end', function(){
                gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start + 'ms')));
            })
            .pipe(source(mainAppFile))
            .pipe(rename({ suffix: '.min' }))
            .pipe(streamify(uglify({ mangle: false })))
            .pipe(gulp.dest(paths.js.dist));
    }
});


/**
 * Compile and minify all SASS files 
 */
gulp.task('sass', function() {
    return sass(paths.css.base + 'main.scss', { 
            style: 'compressed',
            sourcemap: true 
           })
           .on('error', sass.logError)
           .pipe(rename('styles.css'))
           .pipe(rename({ suffix: '.min' }))
           .pipe(gulp.dest(paths.css.dist));
});

/**
 * Bundle all browerify required files into the app file
 */
gulp.task('browserify', function() {
  return browserify(paths.js.base + mainAppFile)
         // .external(dependencies)
         .transform(babelify, {presets: ['es2015', 'react']})
         .bundle()
         .pipe(source(mainAppFile))
         .pipe(rename({ suffix: '.min' }))
         // .pipe(streamify(uglify({ mangle: false })))
         .pipe(gulp.dest(paths.js.dist))
});


gulp.task('js-vendor', function(){
  return gulp.src(vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dist));
});


/**
 * Copy over all the static assests such as images and fonts
 */
gulp.task('copy-static-assets', function(){
    return gulp.src(staticFolders, { base: './src/' })
           .pipe(gulp.dest('dist/'));
});

/**
 * Copy over all the static assests such as images and fonts
 */
gulp.task('copy-favicon', function(){
    return gulp.src(favicon, { base: './src/favicon/' })
           .pipe(gulp.dest('dist/'));
});


/**
 * Clean the dist/ folder before writing anything to it. Clear out any left behind files
 */
gulp.task('clean', function(cb) {
    return del(['dist'], cb);
});


/**
 * Live Reload Server
 */
gulp.task('webserver', function(){
    gulp.src('dist/')
        .pipe(server({
            livereload: true,
            open: true,
            port: 8989
        }));
});
