const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer").default;
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const paths = {
  html: "./src/index.html",
  scss: "./src/assets/styles/scss/**/*.scss",
  css: "./src/assets/styles/css",
};

function styles() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html).on("change", browserSync.reload);
}

exports.styles = styles;
exports.default = gulp.series(styles, serve);
