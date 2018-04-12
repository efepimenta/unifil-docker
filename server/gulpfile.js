const gulp = require('gulp');
const clear = require('gulp-clean');
const ts = require('gulp-typescript');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');

const tsProject = ts.createProject('tsconfig.json');
const paths = {
    dest: '../dist/api'
};

let onError = (err) => {
    gutil.beep();
    gutil.log(gutil.colors.red(err));
};

gulp.task('clean', () => {
    return gulp
        .src(paths.dest)
        .pipe(clear({force: true}));
});

gulp.task('scripts', ['static', 'ssl'], () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp.dest(paths.dest))
        .pipe(plumber({errorHandler: onError}));
});

gulp.task('ssl', () => {
    return gulp
        .src(['ssl/**/*.*'])
        .pipe(gulp.dest(`${paths.dest}/ssl`))
        .pipe(plumber({errorHandler: onError}));
});

gulp.task('static', () => {
    return gulp
        .src(['.foreverignore', 'package.json', 'run.sh'])
        .pipe(gulp.dest(paths.dest))
        .pipe(plumber({errorHandler: onError}));
});

gulp.task('build', ['scripts']);

gulp.task('watch', ['clean', 'scripts'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['scripts']);
});

gulp.task('default', ['watch']);
