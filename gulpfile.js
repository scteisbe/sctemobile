var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');

var paths = {
  sass: ['./scss/**/*.scss', './scss/**/*.sass']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('clean-client-libs', function () {
  return del([
    // specific directories
    'www/lib/angular',
    'www/lib/angular-animate',
    'www/lib/angular-sanitize',
    'www/lib/angular-ui-router',
    'www/lib/ionic-ion-tinder-cards',
    'www/lib/platform.js',
    'www/lib/require.js',
    'www/lib/requirejs',
    'www/lib/requirejs-text',

    // multiple directories
    'www/lib/**/src/*',
    '!www/lib/tabletop/src/tabletop.js',

    'www/lib/**/test',
    'www/lib/**/tests',
    'www/lib/**/examples',
    'www/lib/**/caching',
    'www/lib/**/perf',
    'www/lib/**/build',
    'www/lib/**/doc',
    'www/lib/**/vendor',
    'www/lib/**/lib',
    'www/lib/**/fp',
    'www/lib/**/locale',
    'www/lib/**/templates',

    // . files
    'www/lib/**/.*ignore',
    'www/lib/**/.*rc',
    'www/lib/**/.*.yml',
    'www/lib/**/.bower*',
    'www/lib/**/.bower.json',
    'www/lib/**/.*config',
    'www/lib/**/.*.json',
    'www/lib/**/.*attributes',
    'www/lib/**/.*ignore',
    'www/lib/**/.*github',
    'www/lib/.markdown*',

    // common unnecessary files
    'www/lib/**/package.json',
    'www/lib/**/bower.json',
    'www/lib/**/gruntfile.js',
    'www/lib/**/gulp*.js',
    'www/lib/**/CHANGELOG',
    'www/lib/**/LICENSE',
    'www/lib/**/LICENSE.*',
    'www/lib/**/*.yml',
    'www/lib/**/*.md',
    'www/lib/**/*.map',

    // specific files
    'www/lib/moment/*',
    'www/lib/moment/min/*',
    '!www/lib/moment/min',
    '!www/lib/moment/min/moment.min.js',

    'www/lib/ngstorage/*',
    '!www/lib/ngstorage/ngStorage.min.js',
    
    'www/lib/lodash/*',
    'www/lib/lodash/.markdown-doctest-setup.js',
    'www/lib/lodash/dist/*',
    '!www/lib/lodash/dist',
    '!www/lib/lodash/dist/lodash.min.js',

    '!www/lib/ion-alpha-scroll/src',
    '!www/lib/ion-alpha-scroll/src/ion-alpha-scroll.js',
    '!www/lib/ion-alpha-scroll/src/ion-alpha-scroll.css',
    
    'www/lib/ionic/css/ionic.css',

    'www/lib/ionic/js/*',
    '!www/lib/ionic/js/ionic.bundle.min.js',

    'www/lib/holderjs/*',
    '!www/lib/holderjs/holder.min.js',

    'www/lib/ionic-platform-web-client/dist/ionic.io.bundle.js',
    'www/lib/ionic-platform-web-client/.bower.json',
    'www/lib/ionic-platform-web-client/src',

    'www/lib/ionic-ratings/**/*',
    '!www/lib/ionic-ratings/dist',
    '!www/lib/ionic-ratings/dist/ionic-ratings.min.js',
    '!www/lib/ionic-ratings/src',
    '!www/lib/ionic-ratings/src/ionic-ratings.js', 

    '!www/lib/angular-holderjs/src',
    '!www/lib/angular-holderjs/src/holder.js',

    'www/lib/angular-moment/*',
    '!www/lib/angular-moment/angular-moment.min.js',

    'www/lib/ionic-datepicker/src',

    'www/lib/plugin/src'

  ]);
});
