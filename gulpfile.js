"use strict";

// Path variables
var path = {
  sourcePath: "./source",
  buildPath: "./build",
  scssPath: "/scss",
  cssPath: "/css",
  scssPattern: "/**/*.scss",
  pugPattern: "/**/!(_)*.pug",
  htmlPattern: "/**/*.html"
};

// Packages
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  csscomb = require("gulp-csscomb"),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  htmlbeautify = require("gulp-html-beautify"),
  browserSync = require("browser-sync").create();

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: path.sourcePath,
    notify: false
  });
});

gulp.task("sass", function () {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(browserSync.stream());
});

gulp.task("sort-sass", function () {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
});

gulp.task("sort-html", function () {
  return gulp.src(path.sourcePath + path.htmlPattern)
    .pipe(htmlbeautify("options"))
    .pipe(gulp.dest(path.sourcePath))
});

gulp.task("pug", function () {
  return gulp.src(path.sourcePath + path.pugPattern)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.buildPath))
    .pipe(browserSync.stream());
});

gulp.task("watch", ["browser-sync", "sass"], function() {
  gulp.watch(path.sourcePath + path.scssPath + path.scssPattern, ["sass"]);
  gulp.watch(path.sourcePath + path.htmlPattern).on("change", browserSync.reload);
});

gulp.task("prettify", ["sort-sass", "sort-html"]);
