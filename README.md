# gulp-datasrc-html

> Replace `src`, `srcset` to `data-src`, `data-srcset` supports [LazyLoading](https://github.com/Bladhard/lazy-loading)

[![npm (scoped)](https://img.shields.io/npm/v/gulp-datasrc-html.svg?style=flat-square)](https://www.npmjs.com/package/gulp-datasrc-html)
[![dependencies Status](https://status.david-dm.org/gh/Bladhard/gulp-datasrc-html.svg)](https://david-dm.org/Bladhard/gulp-datasrc-html)
[![License](https://img.shields.io/github/license/bladhard/gulp-datasrc-html.svg?style=flat-square)](https://github.com/Bladhard/gulp-datasrc-html/blob/main/LICENSE)
## Install

```npm
npm i --save-dev gulp-datasrc-html
```

## Example

```html
// Input
<img src="./img/img-1.jpg">
<picture>
    <source srcset="./img/img-1.webp" type="image/webp">
    <img src="./img/img-1.jpg">
</picture>

// Output
<img data-src="./img/img-1.jpg">
<picture>
    <source data-srcset="./img/img-1.webp" type="image/webp">
    <img data-src="./img/img-1.jpg">
</picture>
```

## Usage

```javascript
var dataHTML = require('gulp-datasrc-html');

gulp.task('html',function(){
    gulp.src('./assets/**/*.html')
        .pipe(dataHTML({ ignore: true, tags: 'header' }))
        .pipe(gulp.dest('./public/'))
});
```

## Options

### ignore

```javascript
true - Enables tag-based ignoring
false - by default
```

### tags

```html
<header></header> - tag-based ignoring by default
```

## Donate

<a href="https://www.buymeacoffee.com/bladhard" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
