## ⚠️ This plugin in develop process

# GULP-AVIF

This is gulp plugin for convertation PNG and JPG images to AVIF

GULP-AVIF based to lib (sharp)[https://www.npmjs.com/package/sharp]

### Usage

```
const gulp = require('gulp');
const gulpAvif = require('gulp-avif');

gulp.task('default', ()=>{
    return gulp.src('./from/*.{png,jpg}')
        .pipe(gulpAvif())
        .pipe(gulp.dest('./to/'));
});
```

### Example based integration AVIF

```
<picture>
    <source type="image/avif" srcset="./to/show.avif" />
    <source type="image/webp" srcset="./to/show.webp" />
    <img src="./to/show.png">
</picture>
```