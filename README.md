# gulp-resume

gulp-resume is a [gulp](https://github.com/gulpjs/gulp) plugin to generate a resume using [jsonresume.org](http://jsonresume.org).

[![NPM](https://nodei.co/npm/gulp-resume.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-resume/)

[![Circle CI](https://circleci.com/gh/mattberther/gulp-resume.svg?style=shield)](https://circleci.com/gh/mattberther/gulp-resume)
[![devDependency Status](https://david-dm.org/mattberther/gulp-resume.svg)](https://david-dm.org/mattberther/gulp-resume#info=devDependencies)


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
