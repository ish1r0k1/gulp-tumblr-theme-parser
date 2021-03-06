# gulp-tumblr-theme-parser [![Build Status](https://travis-ci.org/ish1r0k1/gulp-tumblr-theme-parser.svg?branch=master)](https://travis-ci.org/ish1r0k1/gulp-tumblr-theme-parser)

[Node tumblr theme parser](https://github.com/carrot/tumblr-theme-parser) for [gulp](https://github.com/gulpjs/gulp)

# Install

```
npm install -D  gulp-tumblr-theme-parser
```

# Basic Usage

```javascript
'use strict';

var gulp = require('gulp');
var parser = require('gulp-tumblr-theme-parser');

gulp.task('build', function() {
  return gulp.src('./index.html')
    .pipe(parser({ data: './data.json' }))
    .on('error', errorHandler)
    .pipe(gulp.dest('./build'));
});

var errorHandler = function (err) {
  console.log('Error: ' + err);
  this.emit('end')
}
```

# Options

## data
This property can still pass an object as a file path.

```javascript
{ data: { 'title': 'Hello, world.' } }

// or

{ data: './data.json' }
```
