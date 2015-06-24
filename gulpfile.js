var indexOutput     = 'index.html',
    tdsOutput       = 'tds.html',
    tdlOutput       = 'tdl.html',
    staticFolders   = ['src/img/*', 'src/fonts/*'],
    assestFolders   = ['src/js/vendor/'];

var gulp                = require('gulp'),
    plugins             = require('gulp-load-plugins')();
    plugins.sass        = require('gulp-ruby-sass'), 
    plugins.rename      = require('gulp-rename'),
    plugins.uglify      = require('gulp-uglify'), 
    plugins.concat      = require('gulp-concat'), 
    plugins.del         = require('del'),
    plugins.handlebars  = require('gulp-compile-handlebars'),
    plugins.minifyCss   = require('gulp-minify-css'),
    plugins.browserify  = require('browserify'),
    plugins.reactify    = require('reactify'),
    plugins.source      = require('vinyl-source-stream');

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
        dist: 'dist/js/',
    }
}

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

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts', 'handlebars', 'browserify-react', 'copy-static-assets');
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
gulp.task('scripts', ['concat-bower-js', 'copy-bower-js'], function(){
    return gulp.src('src/js/*.js')
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.js.dist))
});

gulp.task('concat-bower-js', function(){
    return gulp.src(bowerJs)
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(gulp.dest(paths.js.dist + '/vendor'));
});

gulp.task('copy-bower-js', function(){
    copyBowerAssets(bowerJsIndependent, paths.js.dist + 'vendor/');
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
 * Compile React Components
 */
gulp.task('browserify-react', browserify);

function browserify() {
    var file = reactApps.shift();
    var b = plugins.browserify();

    b.transform(plugins.reactify);
    b.add(paths.js.react + file);

    b.bundle()
     .pipe(plugins.source(file))
     .pipe(gulp.dest(paths.js.dist + 'react/'));

    if (reactApps.length > 0) {
        browserify();
    }
}

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
