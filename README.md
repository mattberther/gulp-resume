# gulp-resume

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> gulp-resume is a [gulp](https://github.com/gulpjs/gulp) plugin to generate a resume using [jsonresume.org](http://jsonresume.org).

## Usage

```js
var resume = require('gulp-resume');
var rename = require('gulp-rename');

gulp.task('resume', function() {
  return gulp.src('resume.json')
    .pipe(resume({
      format: 'html',
      theme: 'elegant'
    }))
    .pipe(rename('resume.html'))
    .pipe(gulp.dest('.'));
});

```

## Notes
Thank you to the awesome folks behind https://jsonresume.org, a JSON-based open source standard for resumes.

A couple notes on the options that can be passed:

* `format` is the desired output format of the resume. At this time, only `html` is supported.
* `theme` is the jsonresume.org theme to apply to the resume. Themes can be previewed at https://jsonresume.org/themes/.

## License

(MIT License)
Copyright (c) 2016 [Matt Berther](https://matt.berther.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://badge.fury.io/js/gulp-resume.svg
[npm-url]: https://npmjs.org/package/gulp-resume
[travis-image]: https://travis-ci.org/winstonjs/gulp-resume.svg?branch=master
[travis-url]: https://travis-ci.org/winstonjs/gulp-resume
[daviddm-image]: https://david-dm.org/winstonjs/gulp-resume.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/winstonjs/gulp-resume
