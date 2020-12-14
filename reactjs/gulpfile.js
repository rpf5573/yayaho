const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src(['./src/**/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(concat('blocks.style.css'))
    .pipe(gulp.dest('../assets/css'))
});

gulp.task('sass_editor', function() {
    return gulp.src(['./src/**/editor.scss'])
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(minifyCSS())
      .pipe(concat('blocks.editor.css'))
      .pipe(gulp.dest('../assets/css'))
});
 
gulp.task('watch', function(){
  gulp.watch('src/**/style.scss', gulp.series('sass'));
  gulp.watch('src/**/editor.scss', gulp.series('sass_editor'));
})