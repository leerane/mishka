"use strict";

// Name variables

var name = {
  jsFile: "main.js",
  cssFile: "styles.css",
  scssFile: "styles.scss",
  libsFile: "libs.js",
  configFile: "_config.scss",
  spriteFile: "_sprite.scss",
  lastAttrFile: "_last-attr.scss"
};

// Path variables

var path = {
  sourcePath: "./source",
  buildPath: "./build",
  scssPath: "/sass",
  cssPath: "/css",
  jsPath: "/js",
  imgPath: "/img",
  imgOriginalPath: "/original",
  svgPath: "/svg",
  spritePath: "/sprite",
  jsModulesPath: "/modules",
  libsPath: "/libs",
  blocksPath: "/blocks",
  utilityPath: "/utility",
  fontsPath: "/fonts",
  fontsPattern: "/**/*.{woff,woff2}",
  imgPattern: "/**/*.{jpg,jpeg,png,gif}",
  scssPattern: "/**/*.{scss,sass}",
  svgPattern: "/*.svg",
  _scssPattern: "/**/_*.{scss,sass}",
  _lastAttrPattern: "/" + name.lastAttrFile,
  _configFilePattern: "/" + name.configFile,
  scssFilePattern: "/" + name.scssFile,
  _spriteFilePattern: "/" + name.spriteFile,
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
  svgSprite = require("gulp-svg-sprites"),
  svgmin = require("gulp-svgmin"),
  svgo = require("gulp-svgo"),
  imagemin = require("gulp-imagemin"),
  size = require("gulp-size"),
  util = require("gulp-util"),
  jsbeautify = require("js-beautify"),
  mergeStream = require("merge-stream"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  imageminMozjpeg = require("imagemin-mozjpeg"),
  imageminPngquant = require("imagemin-pngquant"),
  imageminWebp = require("imagemin-webp"),
  webp = require("gulp-webp"),
  clean = require("del"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

// Tasks

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: path.buildPath
    },
    notify: false
  });

  browserSync.watch(path.buildPath).on("change", reload);
});

gulp.task("html", () => {
  return gulp.src(path.sourcePath + path.htmlPattern, { since: gulp.lastRun("html") })
    .pipe(plumber())
    .pipe(gulp.dest(path.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task("sass-concat", () => {
  return gulp.src([
    path.sourcePath + path.scssPath + path.utilityPath + path._configFilePattern,
    path.sourcePath + path.scssPath + path.blocksPath + path._scssPattern,
    path.sourcePath + path.scssPath + path.utilityPath + path._lastAttrPattern
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.scssFile))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
    .pipe(reload({ stream: true }));
});

gulp.task("sass-styles", () => {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern, { since: gulp.lastRun("sass-styles")})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.buildPath + path.cssPath))
    .pipe(postcss([cssnano({ minifyFontWeight: false })]))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.buildPath + path.cssPath))
    .pipe(reload({ stream: true }));
});

gulp.task("css", gulp.series("sass-concat", "sass-styles"));

gulp.task("js", () => {
  return gulp.src(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, {
    base: process.cwd()
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.jsFile))
    .pipe(gulp.dest(path.buildPath + path.jsPath))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.buildPath + path.jsPath))
    .pipe(reload({ stream: true }));
});

gulp.task("libs-js", () => {
  return gulp.src(path.sourcePath + path.libsPath + path.jsPattern, { since: gulp.lastRun("libs-js") })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.buildPath + path.jsPath + path.libsPath))
});

gulp.task("compress", () => {
  return gulp.src(path.sourcePath + path.imgPath + path.imgPattern, { since: gulp.lastRun("compress") })
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imageminMozjpeg({
        quality: 98
      }),
      imagemin.optipng({
        optimizationLevel: 3
      })
    ]))
    .pipe(gulp.dest(path.buildPath + path.imgPath))
    .pipe(imagemin([
      imageminWebp({
          quality: 98
        })
    ]))
    .pipe(rename({
      extname: ".webp"
    }))
    .pipe(gulp.dest(path.buildPath + path.imgPath));
});

gulp.task("sprite", () => {
  return gulp.src(path.sourcePath + path.imgPath + path.svgPath + "/to-sprite" + path.svgPattern)
    .pipe(svgSprite({
      mode: "symbols",
      svgPath: path.sourcePath + path.imgPath + path.svgPath + path.spritePath,
      svg: {
        symbols: "sprite.svg"
      },
      preview: false
    }))
    .pipe(cheerio({
      run: function ($) {
        var elements = [
          "#mishka-logo--tablet",
          "#mishka-logo--main",
          "#play-button-icon"
        ];
        var excludeElements = {
          g: elements.map((e) => { return e + " g"}),
          path: elements.map((e) => { return e + " path"}),
          stroke: elements.map((e) => { return e + " [stroke]"}),
          style: elements.map((e) => { return e + " [style]"})
        };
        $("symbol g").not(excludeElements.g.toString()).attr("fill", "currentColor");
        $("symbol path").not(excludeElements.path.toString()).attr("fill", "currentColor");
        $("symbol [stroke]").not(excludeElements.stroke.toString()).attr("stroke", "currentColor");
        $("symbol [style]").not(excludeElements.style.toString()).attr("style", "fill: currentColor");
        $("title").remove();
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(gulp.dest(path.buildPath + path.imgPath + path.svgPath));
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
  return gulp.src(path.sourcePath + path.pugPattern, { since: gulp.lastRun("pug") })
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

gulp.task("copy", () => {
  return gulp.src([
    path.sourcePath + path.imgPath + path.svgPath + path.svgPattern,
    path.sourcePath + path.fontsPath + path.fontsPattern
  ], {
    base: path.sourcePath,
    since: gulp.lastRun("copy")
  })
    .pipe(gulp.dest(path.buildPath));
});

gulp.task("clean", () => {
  return clean(path.buildPath);
});

gulp.task("beautify", gulp.series("sort-sass", "sort-html"));

gulp.task("build", gulp.series("clean", "copy", "sprite", "compress", "html", "css", "libs-js", "js"));

gulp.task("watch", () => {
  gulp.watch(path.sourcePath + path.scssPath + path._scssPattern, gulp.series("css"));
  gulp.watch(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, gulp.series("js"));
  gulp.watch(path.sourcePath + path.htmlPattern, gulp.series("html"));
});

gulp.task("build:watch", gulp.series("build", gulp.parallel("browser-sync", "watch")));

