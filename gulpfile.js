'use strict';

var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var sass = require('gulp-sass');
var webp = require('gulp-webp');
var del = require("del");
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sourcemap = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var server = require('browser-sync').create();

gulp.task('css', gulp.series(function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest('build/css'));
}));

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function () {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('build', gulp.series(
  "clean",
  "copy",
  "css",
));

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task('server', gulp.series('css', function () {
  server.init({
    server: './build'
  });

  gulp.watch('source/sass/**/*.{scss, sass}', gulp.series('css', 'refresh'));
  gulp.watch('source/*.html', gulp.series("html", "refresh"));
}));

gulp.task('start', gulp.series('build', 'server'));
