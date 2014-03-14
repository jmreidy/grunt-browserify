/* global describe, context, it */
'use strict';
var Sinon = require('sinon');
var assert = require('assert');
var Runner = require('../lib/runner');

describe('grunt-browserify', function () {
  it('instatiates browserify', function (done) {
    var b = Sinon.spy(require('browserify'));
    var runner = new Runner({
      browserify: b,
      logger: stubLogger()
    });
    runner.run([], {}, function () {
      assert.equal(b.callCount, 1);
      done();
    });
  });

  context('when passing option of watch:true', function () {
    it('invokes watchify instead of browserify', function (done) {
      var watchify = Sinon.spy(require('watchify'));
      var runner = new Runner({watchify: watchify, logger: stubLogger()});
      runner.run([], {watch: true}, function () {
        assert.equal(watchify.callCount, 1);
        done();
      });
    });
  });


  describe('when passing hash of browserifyOptions', function () {
    it('instantiates browserify with those options');
  });
  describe('when passing option of require', function () {
    it('resolves the filename of each item in the array');
    it('requires each item in the array');
  });
  describe('when passing option of exclude', function () {
    it('resolves the filename of each item in the array');
    it('excludes each item in the array');
  });
  describe('when passing option of ignore', function () {
    it('resolves the filename of each item in the array');
    it('ignores each item in the array');
  });
  describe('when passing option of external', function () {
    it('marks each array element as external');
  });
  describe('when passing option of transform', function () {
    it('invokes each array element transform');
    context('if an options hash is provided', function () {
      it('passes the options hash along with the transform fn');
    });
  });
  describe('when passing option of preBundleCB', function () {
    it('calls the provided callback before bundling');
  });
  describe('when passing option of postBundleCB', function () {
    it('calls the provided callback after bundling');
  });
  describe('when passing option of pipe', function () {
    it('passes the provided function as a pipe to browserify');
  });

/*
  describe('when passing option of alias');
  describe('when passing option of plugin');
*/
});


function stubLogger() {
  return Sinon.stub({ok: function () {}, fail: function () {}, error: function () {}});
}
