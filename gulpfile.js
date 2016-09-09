// require gulp and sass core
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');

// PostCSS
const postcss = require('gulp-postcss');
// Pre-SASS processors
const scssSyntax = require('postcss-scss');
const reporter = require('postcss-reporter');
// After-SASS processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// require and init browserSync
const browserSync = require('browser-sync');

// URL const
const devUrl = 'http://localhost:3000/'; // equal to webpack entry
const entryFile = './style/style.scss';
const src = './style/**/*.scss';
const dest = './public';
let watch = false;

const preSASSProcessors = [
  reporter({ clearMessages: true }),
];

const afterSASSProcessors = [
  autoprefixer({ browsers: ['> 5%', 'last 2 version'] }),
];

const afterProcessorsProduction = [
  autoprefixer({ browsers: ['> 5%', 'last 2 version'] }),
  cssnano(),
];

// PostCSS before Sass compilation
gulp.task('pre-sass', () =>
  gulp.src(src)
  .pipe(postcss(preSASSProcessors, { syntax: scssSyntax }))
);

// Sass compilation with PostCSS
gulp.task('sass', () =>
  gulp.src(entryFile)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(afterSASSProcessors))
  .pipe(sourcemaps.write('./')) // relative to the dest path for seperated map file
  .pipe(gulp.dest(dest))
  .pipe($.if(watch, browserSync.stream({ match: '**/*.css' })))
);

// browserSync
// ============================

gulp.task('browserSync', () =>
  browserSync.init({
    proxy: devUrl,
  })
);

gulp.task('build', (cb) => {
  runSequence(['pre-sass', 'sass'], cb);
});

gulp.task('watch', ['browserSync'], () =>
  gulp.watch('./style/**/*.scss', [
    'pre-sass',
    'sass'])
);

gulp.task('serve',  (cb) => {
  watch = true;
  runSequence('build', () => {
    browserSync({
      notify: true,
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      // server: {
      //   baseDir: ['public'],
      // },
      proxy: { target: devUrl },
    });

    gulp.watch('./style/**/*.scss', ['pre-sass', 'sass']);
    cb();
  });
});

gulp.task('default', [
  'serve',
]);
