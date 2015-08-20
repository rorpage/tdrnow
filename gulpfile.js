var indexOutput     = 'index.html';
var tdsOutput       = 'tds.html';
var tdlOutput       = 'tdl.html';
var staticFolders   = ['src/img/*', 'src/fonts/*'];
var assestFolders   = ['src/js/vendor/'];

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
    plugins.reactify    = require('reactify');
    plugins.source      = require('vinyl-source-stream');
    plugins.streamify   = require('gulp-streamify');
    plugins.babelify    = require('babelify');
    plugins.watchify    = require('watchify');
    plugins.gutil       = require('gulp-util');

var paths = {
    bower: './bower_components/',
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
    },
    cache: {
        base: '.gulp-cache/'
    }
};

var bowerJs = [
    paths.bower + 'jquery/dist/jquery.min.js',
    paths.bower + 'foundation/js/foundation.min.js'
];

var bowerJsIndependent = [
    paths.bower + 'modernizr/modernizr.js'
];

var reactApps = [
    'landing-page.js'
];

var dependencies = [
    'react'
];

var mainAppFile = 'app.js';

gulp.task('default', ['build', 'watch', 'browserify-watch']);

gulp.task('build', ['clean'], function() {
    gulp.start(
        'sass',
        'plugins',
        'handlebars',
        'browserify',
        'concat-vendor',
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
 * Concat and minify all application js files
 */
gulp.task('plugins', function(){
    return gulp.src(['src/js/*.js', '!src/js/app.js'])
           .pipe(plugins.concat('scripts.js'))
           .pipe(plugins.rename({ suffix: '.min' }))
           .pipe(plugins.uglify())
           .pipe(gulp.dest(paths.js.dist))
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
         .external(dependencies)
         .transform(plugins.babelify)
         .bundle()
         .pipe(plugins.source(mainAppFile))
         .pipe(plugins.rename({ suffix: '.min' }))
         .pipe(plugins.streamify(plugins.uglify({ mangle: false })))
         .pipe(gulp.dest(paths.js.dist))
});

/**
 * Concat all vendor files by compiling the browserify and bower vendor files
 * and copying them into a temp folder. Once they are compiled then concat them together.
 */
gulp.task('concat-vendor', ['browserify-vendor', 'bower-vendor', 'copy-bower-static'], function(){
    return gulp.src([paths.cache.base + '*.js'])
           .pipe(plugins.concat('vendor.js'))
           .pipe(plugins.rename({ suffix: '.min'}))
           .pipe(gulp.dest(paths.js.dist))
});


/**
 * Bundle all vendor dependencies into a single file
 */
gulp.task('browserify-vendor', function(){
    return plugins.browserify()
           .require(dependencies)
           .bundle()
           .pipe(plugins.source('browserify-vendor.js'))
           .pipe(plugins.streamify(plugins.uglify({ mangle:false })))
           .pipe(gulp.dest(paths.cache.base))
});


/**
 * Concat all the js dependencies from bower
 */
gulp.task('bower-vendor', function(){
    return gulp.src(bowerJs)
           .pipe(plugins.concat('bower-vendor.js'))
           .pipe(gulp.dest(paths.cache.base));
});

/**
 * Simply copy bower dependencies that cannot be bundled together
 * ex: Mondernizr
 */
gulp.task('copy-bower-static', function(){
    copyBowerAssets(bowerJsIndependent, paths.js.dist + 'vendor/');
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
 * Clean up the temp/ folder
 */
gulp.task('delete-temp', function(cb) {
    plugins.del([paths.temp.base], cb);
});

/**
 * Helper Functions
 */
function copyBowerAssets(bowerPackages, destination) {
    var file = bowerPackages.shift();
    gulp.src(file)
        .pipe(gulp.dest(destination));

    if (bowerPackages.length > 0) {
        copyBowerAssets(bowerPackages, destination);
    }
}
