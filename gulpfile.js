'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const clean        = require('gulp-clean');
const rename       = require('gulp-rename');
sass.compiler      = require('node-sass');

function cleanCSS() {
  return gulp
    .src('./css/**/*', {read: false})
    .pipe(clean());
}

function buildCSS() {
  var postCssPlugins = [
    autoprefixer(), 
    cssnano()
  ]

  return gulp
    .src('./src/scss/init.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./css'));
}

function watch() {
  return gulp
    .watch('./src/scss/**/*.scss', gulp.series(cleanCSS, buildCSS));
}

exports.default = gulp.series(cleanCSS, buildCSS);
exports.watch   = watch;