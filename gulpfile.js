var indexOutput     = 'index.html';
var staticFolders   = ['src/img/*','src/fonts/*', 'src/js/vendor/*'];

var gulp                = require('gulp');
var plugins             = require('gulp-load-plugins')();
    plugins.sass        = require('gulp-ruby-sass'); 
    plugins.rename      = require('gulp-rename');
    plugins.uglify      = require('gulp-uglify'); 
    plugins.concat      = require('gulp-concat'); 
    plugins.del         = require('del');
    plugins.handlebars  = require('gulp-compile-handlebars');
    plugins.minifyCss   = require('gulp-minify-css');
    plugins.browserify  = require('browserify');
    plugins.source      = require('vinyl-source-stream');
    plugins.streamify   = require('gulp-streamify');
    plugins.babelify    = require('babelify');
    plugins.watchify    = require('watchify');
    plugins.gutil       = require('gulp-util');
    plugins.server      = require('gulp-server-livereload');

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
        'handlebars',
        'browserify',
        'js-vendor',
        'copy-static-assets'
    );
});

/**
 * Watch tasks for sass and browserify
 */
gulp.task('watch', function(){
    gulp.watch(paths.css.base + '**/*', ['sass']);
});


gulp.task('browserify-watch', function(){
    var bundler = plugins.watchify(plugins.browserify(paths.js.base + mainAppFile));
    bundler.external(dependencies);
    bundler.transform(plugins.babelify)
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                plugins.gutil.log(plugins.gutil.colors.red(err.toString()));
            })
            .on('end', function(){
                plugins.gutil.log(plugins.gutil.colors.green('Finished rebundling in', (Date.now() - start + 'ms')));
            })
            .pipe(plugins.source(mainAppFile))
            .pipe(plugins.rename({ suffix: '.min' }))
            .pipe(plugins.streamify(plugins.uglify({ mangle: false })))
            .pipe(gulp.dest(paths.js.dist));
    }
});


/**
 * Compile and minify all SASS files 
 */
gulp.task('sass', function() {
    return plugins.sass(paths.css.base + '_styles.scss', { style: 'compressed', sourcemap: true })
           .pipe(plugins.rename('styles.css'))
           .pipe(plugins.rename({ suffix: '.min' }))
           .pipe(gulp.dest(paths.css.dist));
});


/**
 * Compile handlebars templates with the appropriate content
 */
gulp.task('handlebars', function(cb){
    var templateData = require('./src/template/setup-content.json'),
            options = {
                batch: ['./src/template/partials']
            };
    return gulp.src('src/template/index.handlebars')
            .pipe(plugins.handlebars(templateData, options))
            .pipe(plugins.rename(indexOutput))
            .pipe(gulp.dest('dist'));
});


/**
 * Bundle all browerify required files into the app file
 */
gulp.task('browserify', function() {
  return plugins.browserify(paths.js.base + mainAppFile)
         // .external(dependencies)
         .transform(plugins.babelify)
         .bundle()
         .pipe(plugins.source(mainAppFile))
         .pipe(plugins.rename({ suffix: '.min' }))
         .pipe(plugins.streamify(plugins.uglify({ mangle: false })))
         .pipe(gulp.dest(paths.js.dist))
});


gulp.task('js-vendor', function(){
  return gulp.src(vendorJs)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ suffix: '.min' }))
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
 * Clean the dist/ folder before writing anything to it. Clear out any left behind files
 */
gulp.task('clean', function(cb) {
    plugins.del(['dist'], cb)
});


/**
 * Live Reload Server
 */
gulp.task('webserver', function(){
    gulp.src('dist/')
        .pipe(plugins.server({
            livereload: true,
            // directoryListing: true,
            open: true
        }));
});
