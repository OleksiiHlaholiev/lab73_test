'use strict';

var folder_name = 'c:/work/lab73_test/';//path to project
var project_name = folder_name + '/';
var imgSrc = project_name +'src/images/**';
var imgDest = project_name +'build/images';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith  = require('gulp.spritesmith'),
    stylus = require('gulp-stylus'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    cssfont64 = require('gulp-cssfont64'),
    reload = browserSync.reload;
require('events').EventEmitter.defaultMaxListeners = Infinity;
       
       
    var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: project_name +'build/',
        js: project_name + 'build/js/',
        css: project_name + 'build/css/',
        img: project_name + 'build/images/',
        fonts: project_name +'build/fonts/',
        video: project_name +'build/video/'
    },
    src: { //Пути откуда брать исходники
        html: project_name + 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: project_name +'src/js/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: project_name + 'src/css/**/*.*',
        img: project_name + 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: project_name + 'src/fonts/**/*.*',
        video: project_name + 'src/video/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: project_name +'src/**/*.html',
        js: project_name + 'src/js/**/*.js',
        style: project_name + 'src/css/**/*.*',
        img: project_name + 'src/images/**/*.*',
        fonts: project_name + 'src/fonts/**/*.*',
        video: project_name + 'src/video/*.*'
    },
    clean: project_name + 'build'
};


var config = {
    server: {
        baseDir: project_name + "build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "glalex"
};


//собираем html
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .on('end', browserSync.reload)
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
//сборка js 
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(uglify()) //Сожмем наш js
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
//cжимаем css
gulp.task('minify-css', function() {
  return gulp.src(project_name + 'build/styles/*.css')
    .pipe(plumber())
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('dist'));
});
//сборка scss
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber())
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        // .pipe(cleanCSS()) //Сожмем комментирую в рабочем процессе
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
//минификация картинок
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(plumber())
        .pipe(newer(imgDest))//обновление только новых файлов
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        // .pipe(reload({stream: true}));
});
/*
gulp.task('stylus', function() {
    return gulp.src(project_name +'src/css/style.styl')
        .pipe(plumber())
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(project_name + 'build/css'))
});*/
//генерация спрайтов
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src(project_name + 'src/images/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(plumber())
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                imgPath: '../images/sprite.png',
                padding: 10,
                cssFormat: 'css',
                algorithm: 'binary-tree'
            }));

    spriteData.img.pipe(gulp.dest(project_name + 'build/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(project_name + 'src/css/')); // путь, куда сохраняем стили
});


// перемещаем fonts
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('fontsConvert', function () {
    return gulp.src([project_name + 'src/fonts/*.woff', project_name + 'src/fonts/*.woff2'])
        .pipe(cssfont64())
        .pipe(gulp.dest(project_name + 'build/fontsbase/'))
        .pipe(browserSync.stream());
});

// перемещаем video
gulp.task('video:build', function() {
    gulp.src(path.src.video)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.video))
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'video:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('video:build');
    });
    gulp.watch(project_name + 'src/images/sprite/*.*', ['sprite']);
});

gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('default', ['build', 'webserver', 'watch']);