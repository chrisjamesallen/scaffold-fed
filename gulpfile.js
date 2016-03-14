'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('sass', function() {
    return gulp.src('./src/scss/main.scss')

        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Sass Error: <%= error.message %>') }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
            browsers: ['ie 9', '> 1%', 'Firefox > 10', 'Opera > 1'],
            cascade: false
        })) 
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('./app/css/'))
        .pipe(plugins.notify({ message: 'Sass task complete' }));
});

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('JS Error: <%= error.message %>') }))
        //.pipe(plugins.concat('app.js'))
        .pipe(plugins.sourcemaps.write())
        //.pipe(plugins.uglify())
        .pipe(gulp.dest('./app/js/'))
        .pipe(plugins.notify({ message: 'JS task complete' }));
});

gulp.task('templates', function() {
    plugins.nunjucksRender.nunjucks.configure(['src/templates/', 'src/pages'], {watch: false});
    return gulp.src('src/pages/**/*.html')
        .pipe(plugins.nunjucksRender())
        .pipe(gulp.dest('app'))
        .pipe(plugins.notify({ message: 'Nunjucks task complete' }));
});


gulp.task('build', ['js', 'sass', 'templates']);

gulp.task('watch', function() {
      gulp.watch('./src/scss/**/*.scss', ['sass']);
      gulp.watch('./src/js/**/*.js', ['js']);
      gulp.watch(['./src/pages/**/*.html', './src/templates/**/*.html'], ['templates']);
});
