"use strict";

// Name variables

var name = {
  jsFile: "main.js",
  cssFile: "styles.css",
  scssFile: "styles.scss",
  libsFile: "libs.js",
  configFile: "_config.scss"
};

// Path variables

var path = {
  sourcePath: "./source",
  buildPath: "./build",
  scssPath: "/sass",
  cssPath: "/css",
  jsPath: "/js",
  jsModulesPath: "/modules",
  libsPath: "/libs",
  blocksPath: "/blocks",
  utilityPath: "/utility",
  scssPattern: "/**/*.{scss, sass}",
  _scssPattern: "/**/_*.{scss, sass}",
  _configFilePattern: "/" + name.configFile,
  scssFilePattern: "/" + name.scssFile,
  pugPattern: "/**/!(_)*.pug",
  htmlPattern: "/**/!(_)*.html",
  jsPattern: "/**/!(_)*.js",
  levels: ["blocks"]
};

// Packages

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  posthtml = require("gulp-posthtml"),
  csscomb = require("gulp-csscomb"),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  htmlbeautify = require("gulp-html-beautify"),
  gulpBemCss = require("gulp-bem-css"),
  concat = require("gulp-concat"),
  merge = require("gulp-merge"),
  cheerio = require("gulp-cheerio"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  replace = require("gulp-replace"),
  uglify = require("gulp-uglify"),
  svgsprite = require("gulp-svg-sprites"),
  svgmin = require("gulp-svgmin"),
  jsbeautify = require("js-beautify"),
  mergeStream = require("merge-stream"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

// Tasks

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: path.sourcePath,
    notify: false
  });
});

gulp.task("sass-concat", () => {
  return gulp.src(
    [path.sourcePath + path.scssPath + path.utilityPath + path._configFilePattern,
      path.sourcePath + path.scssPath + path.blocksPath + path._scssPattern]
  )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.scssFile))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
    .pipe(reload({ stream: true }));
});

gulp.task("sass-styles", ["sass-concat"], () => {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(postcss([ cssnano({ minifyFontWeight: false }) ]))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(reload({ stream: true }));
});

gulp.task("css", ["sass-concat", "sass-styles"]);

gulp.task("js", () => {
  return gulp.src(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, { base: process.cwd() })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.jsFile))
    .pipe(gulp.dest(path.sourcePath + path.jsPath))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.jsPath))
    .pipe(reload({ stream: true }));
});

gulp.task("libs-js", () => {
  return gulp.src(path.sourcePath + path.libsPath  + path.jsPattern, { base: process.cwd() })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.libsFile))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.jsPath))
});

gulp.task("sort-sass", () => {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
});

gulp.task("sort-html", () => {
  gulp.src(path.sourcePath + path.htmlPattern)
    .pipe(htmlbeautify())
    .pipe(gulp.dest(path.buildPath))
});

gulp.task("pug", () => {
  return gulp.src(path.sourcePath + path.pugPattern)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task("bem-css", () => {
  gulp.src(path.sourcePath + path.htmlPattern)
    .pipe(gulpBemCss({
      folder: path.sourcePath + path.scssPath + path.blocksPath,
      extension: "scss",
      elementSeparator: "__",
      modifierSeparator: "--"
    }))
    .pipe(gulp.dest(path.sourcePath))
});

gulp.task("server", ["browser-sync", "css", "js", "libs-js"], function() {
  gulp.watch(path.sourcePath + path.scssPath + path.scssPattern, ["sass"]);
  gulp.watch(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, ["js"]);
  gulp.watch(path.sourcePath + path.htmlPattern).on("change", reload);
});

gulp.task("beautify", ["sort-sass", "sort-html"]);
