"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var pump = require("pump");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var run = require("run-sequence");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

gulp.task("images", function () {
    gulp.src("build/img/**/*.{png,jpg,svg}")
      .pipe(imagemin([
          imagemin.optipng( { optimizationLevel: 3 }),
          imagemin.jpegtran( { progressive: true }),
          imagemin.svgo()
      ]))

      .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
   gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("htmlmin", function () {
    gulp.src("source/**/*.{html,htm}")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"));
});

gulp.task("jsmin", function () {
    pump([
      gulp.src("source/js/**/*.js"),
        uglify(),
        rename( { suffix: '.min'} ),
        gulp.dest("build/js")
    ]);
});

gulp.task("sprite", function () {
  pump([
    gulp.src("source/img/icons/*.svg"),
    svgstore({ inlineSvg: true} ),
    rename("sprite.svg"),
    gulp.dest("build/img/icons")
  ]);
});

gulp.task("copy", function () {
  gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "!source/img/icons/*.svg"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "htmlmin",
    "jsmin",
    "style",
    "sprite",
    "images",
    "webp",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/js/**/*.js", ["style"]);

  gulp.watch("source/*.html").on("change", server.reload);
});
