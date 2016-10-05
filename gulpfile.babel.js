import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';

function compile(watch) {
  const bundler = watchify(browserify('./src/api.js')
    .transform(babel))
    .require('./src/api.js', { expose: 'mekong'});

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('mekong.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile() });
gulp.task('watch', function() { return watch() });

gulp.task('default', ['watch']);
