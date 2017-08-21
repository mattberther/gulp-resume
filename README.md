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
* `proxy` is an optional proxy server url such as `http://1.2.3.4:8080`

## License
MIT

[npm-image]: https://badge.fury.io/js/gulp-resume.svg
[npm-url]: https://npmjs.org/package/gulp-resume
[travis-image]: https://travis-ci.org/mattberther/gulp-resume.svg?branch=master
[travis-url]: https://travis-ci.org/mattberther/gulp-resume
[daviddm-image]: https://david-dm.org/mattberther/gulp-resume.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mattberther/gulp-resume
