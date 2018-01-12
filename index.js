'use strict';

const through = require('through2');
const request = require('request');

const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-resume';
const THEME_SERVER = 'http://themes.jsonresume.org/theme/';
const THEME_REGISTRY = 'http://themes.jsonresume.org/themes.json';
const SUPPORTED_FORMATS = ['html'];
let SUPPORTED_THEMES = [];
const DEFAULT_THEMES = [
  'elegant', 'paper', 'kendall', 'flat',
  'modern', 'classy', 'class', 'short',
  'slick', 'kwan', 'onepage'
];

const getThemes = function (options, cb) {
  options.url = THEME_REGISTRY;
  request(options, function (err, resp, body) {
    const themes = Object.keys(JSON.parse(body).themes) || DEFAULT_THEMES;
    cb(themes, err);
  });
};

module.exports = function (options) {
  options = options || {};

  const format = options.format || 'html';
  const theme = options.theme || 'flat';
  const proxy = options.proxy || null;

  const stream = through.obj(function (file, enc, cb) {
    const _self = this;

    if (SUPPORTED_FORMATS.indexOf(format) === -1) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'invalid format specified'));
      return cb();
    }

    const requestOptions = {};

    if (proxy) {
      requestOptions.proxy = proxy;
    }

    getThemes(requestOptions, function (themes) {
      SUPPORTED_THEMES = themes;
      if (SUPPORTED_THEMES.indexOf(theme) === -1) {
        _self.emit('error', new PluginError(PLUGIN_NAME, 'invalid theme specified'));
        return cb();
      }
    });

    if (file.isBuffer()) {
      request.post({
        url: THEME_SERVER + theme,
        proxy: proxy,
        body: {
          resume: JSON.parse(file.contents.toString())
        },
        json: true
      }, function (err, resp, body) {
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
