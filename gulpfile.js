var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var cachebust = require("gulp-cache-bust");
var tslint = require('gulp-tslint');

var paths = {
    pages: ['src/*.html'],
    typeScripts: ['src/**/*.ts']
};

var browserifyConfig = {
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
};

gulp.task("lint", function() {
    return gulp.src(paths.typeScripts)
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report());
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(cachebust({type: 'timestamp'}))
        .pipe(gulp.dest("dist"));
});

gulp.task("bundle", ["lint"], function() {
    return browserify(browserifyConfig)
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html", "bundle"]);

gulp.task("watch", function() {
    var watch = watchify(browserify(browserifyConfig).plugin(tsify));

    var update = function(changedFiles) {
        var compileStream = watch
            .bundle()
            .on('error', gutil.log.bind(gutil, gutil.colors.red('browserify error\n')))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest("dist"));

        if(!changedFiles) return compileStream;

        var lintStream = gulp.src(changedFiles)
            .pipe(tslint({
                formatter: "stylish"
            }))
            .pipe(tslint.report({
                emitError: false
            }));

        return merge(lintStream, compileStream);
    };

    watch.on("update", update);
    watch.on("log", gutil.log);

    return update();
});
