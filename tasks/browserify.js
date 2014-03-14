/*
* grunt-browserify
* https://github.com/jmreidy/grunt-browserify
*
* Copyright (c) 2013 Justin Reidy
* Licensed under the MIT license.
*/
'use strict';
var Runner = require('../lib/runner');
var path = require('path');
var async = require('async');

module.exports = function (grunt) {
  grunt.registerMultiTask('browserify', 'Grunt task for browserify.', function () {
    async.forEachSeries(this.files, function (file, next) {
      var runner = new Runner();
      var files = grunt.file.expand({filter: 'isFile'}, file.src).map(function (f) {
        return path.resolve(f);
      });
      runner.run(files, this.options(), next);
    });
  });
};
