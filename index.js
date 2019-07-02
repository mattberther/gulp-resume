'use strict';

const through = require('through2');
const request = require('request');

const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-resume';
const THEME_SERVER = 'https://themes.jsonresume.org/theme/';
const SUPPORTED_FORMATS = ['html'];

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

                if (resp.body.match(/^Theme not supported/g)) {
                    _self.emit('error', new PluginError(PLUGIN_NAME, 'invalid theme specified'));
                    return cb();
                }

                file.contents = Buffer.from(body);
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
