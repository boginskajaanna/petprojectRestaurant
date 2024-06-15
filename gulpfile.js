const { src, dest, watch, parallel } = require("gulp"); //src dest watch parallel идет под капотом gulp

const scss = require("gulp-sass")(require("sass")); //sass
const concat = require("gulp-concat"); //платин для конкатенации
const uglify = require("gulp-uglify-es").default; //плагин для минификации js
const browserSync = require("browser-sync").create(); //плагин для автообновления страницы
const autoprefixer = require("gulp-autoprefixer"); //плагин для вендорных префиксов // ТОЛЬКО 8 версия, с 9 выдает ошибку


//конвертация scss с css и минификация
function styles() {
  return src("scss/style.scss")
    .pipe(concat("style.min.css")) //конкатенация (склеивание, обьединение) и переименование файлов
    .pipe(scss({ outputStyle: "compressed" })) //минификация css
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] })) //добавление автопрефиксов
    .pipe(dest("css"))
    .pipe(browserSync.stream());
}

//минификация js
function scripts() {
  return src(["js/main.js"])
    .pipe(concat("main.min.js")) //переименовали
    .pipe(uglify())
    .pipe(dest("js"))
    .pipe(browserSync.stream());
}

//слежение за состоянием scss js файлов
function watching() {
  browserSync.init({
    server: {
      baseDir: "./", //автообновление страницы браузера если есть изменения в папке app
    },
  });
  watch(["scss/**/*.scss"], styles); //отслеживаем изменения стилей, если есть запускаем автоматически styles
  watch(["js/main.js"], scripts); //отслеживаем изменения стилей, если есть запускаем автоматически scripts
  // watch(["app/components/*", 'app/pages/*'], pages); //отслеживаем изменения html компонентов, если есть запускаем автоматически pages
  watch(["*.html"]).on("change", browserSync.reload); //отслеживание изменения в html файлах
}



exports.styles = styles; // команда gulp styles
exports.scripts = scripts; // команда gulp scripts
exports.watching = watching; // команда gulp watching


//запуск последовательно всех скриптов по дефолту
//в терминале просто команда gulp
exports.default = parallel(styles, scripts, watching);

