import gulp from 'gulp';
import { path } from './gulp/config.js';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';

const sass = gulpSass(dartSass);

const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(fileInclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
};

const scss = () => {
  return gulp
    .src(['./node_modules/lightslider/dist/css/lightslider.css', path.src.scss])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowserlist: ['last 2 versions'],
        cascade: true,
      })
    )
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
};

const js = () => {
  return gulp
    .src(
      [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/lightslider/dist/js/lightslider.js',
        path.src.js,
      ],
      { sourcemaps: true }
    )
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
};

const assets = () => {
  return gulp
    .src(path.src.assets)
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.assets))

    .pipe(browserSync.stream());
};

const watcher = () => {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.assets, assets);
};

const remove = () => {
  return deleteAsync(path.clean.files);
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: `${path.build.html}`,
    },
    notify: false,
    port: 3000,
  });
};

const globalTasks = gulp.parallel(html, scss, js, assets);

export const build = gulp.series(remove, globalTasks);

export const dev = gulp.series(
  remove,
  globalTasks,
  gulp.parallel(watcher, server)
);

gulp.task('default', dev);
