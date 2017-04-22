'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),
    sourceFile = './app/scripts/Index.js',
    destFolder = './dist/scripts',
    destFileName = 'app.js';

var lessFile = './app/styles/main.less',
    destLessFolder = './dist/styles',
    destLessFile = 'main.css';

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Styles
gulp.task('styles',['clean','less']);

gulp.task('less', function() {

  return gulp.src([lessFile])
    .pipe($.less({
      compress: false
    }).on('error', function(err){
        $.util.log(err);
        this.emit('end');
     }))
    .pipe($.rename(destLessFile))
    .pipe(gulp.dest(destLessFolder))
    .pipe($.rename('main.min.css'))
    .pipe(gulp.dest(destLessFolder));

});


var bundler = watchify(browserify({
    entries: [sourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
        .on('end', function() {
            reload();
        });
}

// Scripts
gulp.task('scripts', rebundle);

gulp.task('buildScripts', function() {
    return browserify(sourceFile)
        .bundle()
        .pipe(source(destFileName))
        .pipe(gulp.dest('dist/scripts'));
});

// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function(cb) {
    $.cache.clearAll();
    cb(del.sync(['dist/styles', 'dist/scripts']));
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function() {
    return gulp.src('./app/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

// BuildBundle 
gulp.task('buildBundle', ['styles', 'buildScripts', 'bower'], function() {
    return gulp.src('./app/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

// Bower
gulp.task('bower', function() {
    
    gulp.src(['app/bower_components/**/*.js','app/bower_components/**/*.css'], {
            base: 'app/bower_components'
        })
        .pipe(gulp.dest('dist/bower_components/'));

});

// Watch
gulp.task('watch', ['html', 'bundle'], function() {

    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['dist', 'app']
    });
    // Watch .html files
    gulp.watch('app/*.html', ['html']);
    gulp.watch(['app/styles/**/*.less', 'app/styles/**/*.css'], ['styles', 'scripts', reload]);
    // Watch image files
    // gulp.watch('app/images/**/*', reload);
});

// Build
gulp.task('build', ['html', 'buildBundle'], function() {
    gulp.src('dist/scripts/app.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('dist/scripts'));
});

// Default task
gulp.task('default', ['clean', 'build']);
