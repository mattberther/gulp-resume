/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

var resume = require('../');

var fs = require('fs');
var should = require('should');
var File = require('vinyl');
var es = require('event-stream');
require('mocha');

describe('gulp-resume', function() {
  var fakeResume;

  function getFakeResume(fileContent) {
    return new File({
      path: './test/fixture/resume.json',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer(fileContent || '')
    });
  }

  function getFakeFileReadStream() {
    return new File({
      contents: es.readArray(['Hello world']),
      path: './test/fixture/resume.json'
    });
  }

  beforeEach(function() {
    fakeResume = getFakeResume(fs.readFileSync('./test/fixtures/resume.json'));
  });

  describe('resume()', function() {
    it('should create an html formatted resume', function(done) {
      var stream = resume({theme: 'elegant'});

      stream.once('data', function(file) {
        file.isBuffer().should.be.true;
        should.exist(file.contents);
        file.contents.toString().should.startWith('<!DOCTYPE html><html lang="en">');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });

    it('should create an html formatted resume (stream)', function(done) {
      var stream = resume({theme: 'elegant'});

      stream.once('data', function(file) {
        file.isStream().should.be.true;
        file.contents.pipe(es.wait(function(err, data) {
          data.toString('utf8').should.startWith('<!DOCTYPE html><html lang="en">');
          done();
        }));
      });

      stream.write(getFakeFileReadStream());
      stream.end();
    });

    it('should validate the theme requested', function(done) {
      var stream = resume({theme: 'invalid'});
      stream.once('error', function(err) {
        err.should.have.property('message', 'invalid theme specified');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });

    it('should error if the format is not html or pdf', function(done) {
      var stream = resume({format: 'invalid'});
      stream.once('error', function(err) {
        err.should.have.property('message', 'invalid format specified');
        done();
      });

      stream.write(fakeResume);
      stream.end();
    });
  });
});
