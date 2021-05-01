# GULP-AVIF

This is gulp plugin for convertation PNG and JPG images to AVIF

GULP-AVIF based to lib [sharp](https://www.npmjs.com/package/sharp)

### Usage

```js
const gulp = require('gulp');
const gulpAvif = require('gulp-avif');

gulp.task('default', ()=>{
    return gulp.src('./from/*.{png,jpg}')
        .pipe(gulpAvif())
        .pipe(gulp.dest('./to/'));
});
```

### Example based integration AVIF

```html
<picture>
    <source type="image/avif" srcset="./to/show.avif" />
    <source type="image/webp" srcset="./to/show.webp" />
    <img src="./to/show.png">
</picture>
```

### API

#### gulpAvif(options?)

`options` Object ? output options
- `options.quality` number  quality, integer 1-100 (optional, default 90)
- `options.lossless` boolean  use lossless compression (optional, default false)
- `options.speed` boolean  CPU effort vs file size, 0 (slowest/smallest) to 8 (fastest/largest) (optional, default 5)
- `options.chromaSubsampling` string  set to '4:4:4' to prevent chroma subsampling otherwise defaults to '4:2:0' chroma subsampling, requires libvips v8.11.0 (optional, default '4:2:0')

Throws Error  Invalid options
