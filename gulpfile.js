var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('release', function() {
    return gulp.src([
        './mistralic.js'])
        .pipe(concat('mistralic.js'))
        .pipe(gulp.dest('./bin'));
});