/* eslint-disable no-unused-expressions,max-nested-callbacks */
'use strict';

var resume = require('../');

var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var VinylFile = require('vinyl');
var es = require('event-stream');

chai.use(require('chai-string'));

describe('gulp-resume', function () {
  var fakeResume;
  this.timeout(3000);

  function getFakeResume(fileContent) {
    return new VinylFile({
      path: './test/fixture/resume.json',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer(fileContent || '')
    });
  }

  function getFakeFileReadStream() {
    return new VinylFile({
      contents: es.readArray(['Hello world']),
      path: './test/fixture/resume.json'
    });
  }

  beforeEach(function () {
    fakeResume = getFakeResume(fs.readFileSync('./test/fixtures/resume.json'));
  });

  describe('resume()', function () {
    it('should create an html formatted resume', function (done) {
      var stream = resume({theme: 'elegant'});

      stream.once('data', function (file) {
        expect(file.isBuffer()).to.be.true;
        expect(file.contents).to.exist;
        expect(file.contents.toString()).to.startWith('<!DOCTYPE html><html lang="en">');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });

    it('should create an html formatted resume (stream)', function (done) {
      var stream = resume({theme: 'elegant'});

      stream.once('data', function (file) {
        expect(file.isStream()).to.be.true;
        file.contents.pipe(es.wait(function (err, data) {
          if (err) {
            done(err);
          }

          expect(data.toString('utf8')).to.startWith('<!DOCTYPE html><html lang="en">');
          done();
        }));
      });

      stream.write(getFakeFileReadStream());
      stream.end();
    });

    it('should validate the theme requested', function (done) {
      var stream = resume({theme: 'invalid'});
      stream.once('error', function (err) {
        expect(err).to.have.property('message', 'invalid theme specified');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });

    it('should error if the format is not html or pdf', function (done) {
      var stream = resume({format: 'invalid'});
      stream.once('error', function (err) {
        expect(err).to.have.property('message', 'invalid format specified');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });
  });
});
