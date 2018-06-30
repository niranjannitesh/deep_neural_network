var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function () {
    return gulp.src(['./src/*.js', '!./src/test.js', '!./src/index.js'])
        .pipe(concat('nnet.js'))
        .pipe(gulp.dest('./build/'));
});
