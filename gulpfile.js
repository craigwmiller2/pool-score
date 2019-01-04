// Gulp.js configuration
'use strict';

// src is source files (must have a trailing slash / )
// build is destination (must have a trailing slash / )
// root is name of root directory where WP is installed
// theme is theme name
const dir = {
  src: 'src/',
  build: '/Applications/XAMPP/xamppfiles/htdocs/pool-score/wp-content/themes/pool-score/',
  root: 'pool-score',
  theme: 'pool-score'
},

// Gulp and plugins
gulp          = require('gulp'),
gutil         = require('gulp-util'),
newer         = require('gulp-newer'),
imagemin      = require('gulp-imagemin'),
sass          = require('gulp-sass'),
postcss       = require('gulp-postcss'),
deporder      = require('gulp-deporder'),
concat        = require('gulp-concat'),
stripdebug    = require('gulp-strip-debug'),
uglify        = require('gulp-uglify-es').default,
plumber       = require('gulp-plumber')
;

// Browser-sync
var browsersync = false;

// PHP settings
const php = {
  src           : dir.src + '**/*.php',
  build         : dir.build
};

// copy PHP files
gulp.task('php', () => {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});

// image settings
const images = {
  src         : dir.src + 'media/**/*',
  build       : dir.build + 'media/'
};

// image processing
gulp.task('images', () => {
  return gulp.src(images.src)
    .pipe(newer(images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(images.build));
});

// add Advanced Custom Fields to lib folder from archive drive
const acf = {
  src: '/Volumes/com-archive2/Website Archive/_lib/acf/**/*',
  dest: dir.src + 'lib/acf'
}

gulp.task('acf', () => {
  return gulp.src(acf.src)
    .pipe(newer(acf.dest))
    .pipe(gulp.dest(acf.dest))
});

// transfers lib plugin files (ACF)
const lib = {
  src: dir.src + 'lib/**/*',
  build: dir.build + 'lib/'
};

gulp.task('lib', () => {
  return gulp.src(lib.src)
    .pipe(newer(lib.build))
    .pipe(gulp.dest(lib.build))
});

// builds lib in src before sending to dest
gulp.task('build-lib', ['acf', 'lib']);

// copy screenshot for theme image
gulp.task('ss', () => {
  return gulp.src(dir.src + 'screenshot.png')
    .pipe(newer(dir.build))
    .pipe(gulp.dest(dir.build))
});

// CSS settings
var css = {
  src         : dir.src + 'sass/style.scss',
  watch       : dir.src + 'sass/**/*',
  build       : dir.build,
  sassOpts: {
    outputStyle     : 'nested',
    imagePath       : images.build,
    precision       : 3,
    errLogToConsole : true
  },
  processors: [
    require('postcss-assets')({
      loadPaths: ['images/'],
      basePath: dir.build,
      baseUrl: '/wp-content/themes/' + dir.theme
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 2%']
    }),
    // require('css-mqpacker'),
    require('cssnano')
  ]
};

// CSS processing
gulp.task('css', ['images'], () => {
  return gulp.src(css.src)
    .pipe(plumber())
    .pipe(sass(css.sassOpts))
    .pipe(postcss(css.processors))
    .pipe(gulp.dest(css.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// JavaScript settings
const js = {
  src         : dir.src + 'js/**/*',
  build       : dir.build + 'js/',
  filename    : 'main.js'
};

// JavaScript processing
gulp.task('js', () => {

  return gulp.src(js.src)
    .pipe(deporder())
    .pipe(concat(js.filename))
    // .pipe(stripdebug())
    // .pipe(uglify())
    .pipe(gulp.dest(js.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());

});

gulp.task('build', ['php', 'css', 'js', 'build-lib', 'ss']);

// Browsersync options
const syncOpts = {
  proxy       : 'localhost/' + dir.root,
  files       : dir.build + '**/*',
  open        : true,
  notify      : false,
  ghostMode   : false,
  ui: {
    port: 3000
  }
};


// browser-sync
gulp.task('browsersync', () => {
  if (browsersync === false) {
    browsersync = require('browser-sync').create();
    browsersync.init(syncOpts);
  }
});

// watch for file changes
gulp.task('watch', ['browsersync'], () => {

  // page changes
  gulp.watch(php.src, ['php'], browsersync ? browsersync.reload : {});

  // image changes
  gulp.watch(images.src, ['images']);

    // CSS changes
  gulp.watch(css.watch, ['css']);

  // JavaScript main changes
  gulp.watch(js.src, ['js']);

});

// default task
gulp.task('default', ['build', 'watch']);

const replace = require('gulp-replace');

gulp.task('replace_all', function(){
  gulp.src(dir.src + '/**/*')
    .pipe(replace('Orknet_Starter_Theme', 'Pool_Score'))
    .pipe(replace('orknet_starter_theme', 'pool_score'))
    .pipe(replace('orknet-starter-theme', 'pool-score'))
    .pipe(replace('Orknet Starter Theme', 'Pool Score'))
    .pipe(gulp.dest(dir.src));
    // .pipe(gulp.dest(dir.build));
});
