const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Функция для компиляции SCSS в CSS
function styles() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("css"));
}

// Функция для наблюдения за изменениями в SCSS файлах
function watch() {
  gulp.watch("scss/**/*.scss", styles);
}

// Экспорт функций
exports.styles = styles;
exports.watch = watch;
