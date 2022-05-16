# GULP-AVIF

This is gulp plugin for convertation PNG and JPG images to AVIF

GULP-AVIF based to lib [sharp](https://www.npmjs.com/package/sharp)

### Usage

```js
const gulp = require('gulp');
const gulpAvif = require('gulp-avif');

gulp.task('default', ()=>{
    return gulp.src('./from/*.{png,jpg,svg}')
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
- `options.quality` _number_  quality, integer 1-100 (optional, default 90)
- `options.lossless` _boolean_  use lossless compression (optional, default false)
- `options.speed` _boolean_  CPU effort vs file size, 0 (slowest/smallest) to 8 (fastest/largest) (optional, default 5)
- `options.chromaSubsampling` _string_  set to '4:4:4' to prevent chroma subsampling otherwise defaults to '4:2:0' chroma subsampling, requires libvips v8.11.0 (optional, default '4:2:0')

**only for SVG**

- `options.width` _number_ output image width (optional, default 64)
- `options.height` _number_ output image height (optional, default _depend of width, if width empty - 64_). If the image ratio less original image will cutted.


Throws Error  Invalid options

### Releases

#### v 1.1.1
- Removed unneed `console.log`

#### v 1.1.0
- Added support SVG source file
- Update depencency after Dependabot alert.
