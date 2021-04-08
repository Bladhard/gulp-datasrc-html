# gulp-datasrc-html
## Install
```
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
```
true - Enables tag-based ignoring
false - by default
```
### tags
<header></header> - tag-based ignoring by default