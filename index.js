'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var request = require('request');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-resume';
var THEME_SERVER = 'http://themes.jsonresume.org/theme/';
var SUPPORTED_FORMATS = ['html'];
var SUPPORTED_THEMES = [
  'elegant', 'paper', 'kendall', 'flat',
  'modern', 'classy', 'class', 'short',
  'slick', 'kwan', 'onepage'
];

module.exports = function(options) {
  if (!options) {
    options = {};
  }

  var format = options.format || 'html';
  var theme = options.theme || 'flat';

  var stream = through.obj(function(file, enc, cb) {
    if (SUPPORTED_FORMATS.indexOf(format) === -1) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'invalid format specified'));
      return cb();
    }

    if (SUPPORTED_THEMES.indexOf(theme) === -1) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'invalid theme specified'));
      return cb();
    }

    var _self = this;

    if (file.isBuffer()) {
      request.post({
        url: THEME_SERVER + theme,
        body: {
          resume: JSON.parse(file.contents.toString()),
        },
        json: true
      }, function(err, resp, body) {
        if (err) {
          _self.emit('error', err);
          return cb();
        }

        file.contents = new Buffer(body);
        _self.push(file);
        return cb();
      });
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(request.post({
        url: THEME_SERVER + theme
      }));

      this.push(file);
      cb();
    }
  });

  return stream;
};
