var gulp = require('gulp');
var gnf = require('gulp-npm-files');
var sass = require('gulp-sass');

gulp.task('copyNpmDependenciesOnly', function() {
  gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(){
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ includePaths: ['./scss/**'], errLogToConsole: true })) // Using gulp-sass
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
});



