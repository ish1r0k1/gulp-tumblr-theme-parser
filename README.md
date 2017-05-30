# gulp-tumblr-theme-parser

[Node tumblr theme parser](https://github.com/carrot/tumblr-theme-parser) for [gulpjs/gulp: The streaming build system](https://github.com/gulpjs/gulp)

# Basic Usage

```javascript
'use strict';

var gulp = require('gulp');
var parser = require('gulp-tumblr-theme-parser');

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(parser({ data: './data.json' }))
    .pipe(gulp.dest('./build'));
});
```

# Options

## data
This property can still pass an object as a file path.

```javascript
{ data: './data.json' }

// or

{ data: { 'title': 'Hello, world.' } }
```
