var del    = require('del'),
    gulp   = require('gulp'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    uglify = require('gulp-uglify');

var HEADER = "define(['angular'], function(angular) {\n" +
             "'use strict';\n\n" +
             "angular.module('angular-electron', []);\n\n";
var FOOTER = "\n});";

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('build:dev', ['clean'], function () {
  return gulp.src('./src/*')
         .pipe(concat('angular-electron.js'))
         .pipe(insert.prepend(HEADER))
         .pipe(insert.append(FOOTER))
         .pipe(gulp.dest('./dist/'));
});

gulp.task('build:prod', ['clean'], function () {
  return gulp.src('./src/*')
         .pipe(concat('angular-electron.min.js'))
         .pipe(insert.prepend(HEADER))
         .pipe(insert.append(FOOTER))
         .pipe(uglify())
         .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['build:dev', 'build:prod'], function() {
});
