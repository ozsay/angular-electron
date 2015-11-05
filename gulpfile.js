var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    uglify = require('gulp-uglify');

var HEADER = "(function(angular, electronRequire, electronProcess, undefined) {'use strict';\n\n" +
             "angular.module('angular-electron', []);\n\n";
var FOOTER = "\n})(window.angular, window.require, window.process);\n";

gulp.task('build:dev', function () {
  return gulp.src('./src/*')
         .pipe(concat('angular-electron.js'))
         .pipe(insert.prepend(HEADER))
         .pipe(insert.append(FOOTER))
         .pipe(gulp.dest('./'));
});

gulp.task('build:prod', function () {
  return gulp.src('./src/*')
         .pipe(concat('angular-electron.min.js'))
         .pipe(insert.prepend(HEADER))
         .pipe(insert.append(FOOTER))
         .pipe(uglify())
         .pipe(gulp.dest('./'));
});

gulp.task('build', ['build:dev', 'build:prod'], function() {
});
