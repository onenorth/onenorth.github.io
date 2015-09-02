'use strict';
var gulp = require('gulp');

var dest = './_dist';
var assets = './public';


// default task
gulp.task('default', function(done) {
  var sequence = require('run-sequence');
  return sequence(['styles', 'images', 'vectors'], ['compile', 'copy:extras'], done);
});

gulp.task('serve', function(done) {
  var sequence = require('run-sequence');
  return sequence(['default'], ['watch'], done);
});

gulp.task('deploy', function() {
  var github = require('gulp-gh-pages');

  return gulp.src(dest)
    .pipe(github({ branch: 'master'}))
})

gulp.task('styles', function() {
  var sass = require('gulp-sass');
  var autoprefixer = require('autoprefixer-core');
  var csso = require('gulp-csso');
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(assets + '/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest + '/assets/css'));
});

gulp.task('images', function() {
  return gulp.src(assets + '/images/**/*.{bmp,gif,jpeg,jpg,png}')
    .pipe(gulp.dest(dest + '/assets/images'));
});

gulp.task('vectors', function() {
  var svgmin = require('gulp-svgmin');
  return gulp.src(assets + '/vectors/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(dest + '/assets/vectors'));
});

gulp.task('compile', function(done) {
  var assemble = require('kickstart-assemble');
  var options = {
    assets: dest + '/public',
    data: assets + '/data/**/*.{json, yml}',
    layout: 'default-layout',
    layouts: './templates/views/layouts/*.hbs',
    partials: './templates/views/partials/**/*.hbs',
    pages: './templates/content/**/*.{hbs,html,md}',
    dest: dest
  };

  assemble.templates(options, done);
});

gulp.task('copy:extras', function(done) {
  return gulp.src([assets + '/favicon.ico', assets + '/robots.txt'])
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
  var browserSync = require('browser-sync').create();

  browserSync.init({
    server: {
      baseDir: dest
    }
  });

  gulp.watch(dest + '/public/css/*.css', browserSync.reload);

});
