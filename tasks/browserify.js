'use strict';

var fs = require('fs');
var path = require('path');
/*
 * grunt-browserify
 * https://github.com/jmreidy/grunt-browserify
 *
 * Copyright (c) 2013 Justin Reidy
 * Licensed under the MIT license.
 */
var browserify = require('browserify');

module.exports = function (grunt) {
  grunt.registerMultiTask('browserify', 'Grunt task for browserify.', function () {
    var done = this.async();

    var files = this.filesSrc.map(function (file) {
      return path.resolve(file);
    });

    var b = browserify(files);
    b.on('error', function (err) {
      grunt.fail.warn(err);
    });

    if (this.data.ignore) {
      grunt.file.expand({filter: 'isFile'}, this.data.ignore)
        .forEach(function (file) {

          b.ignore(path.resolve(file));
        });
    }

    if (this.data.alias) {
      var aliases = this.data.alias;
      if (aliases.split) {
        aliases = aliases.split(',');
      }
      aliases.forEach(function (alias) {
        alias = alias.split(':');
        grunt.file.expand({filter: 'isFile'}, alias[0])
          .forEach(function (file) {
            b.require(path.resolve(file), {expose: alias[1]});
          });

      });
    }

    if (this.data.external) {
      grunt.file.expand({filter: 'isFile'}, this.data.external)
        .forEach(function (file) {
          b.external(path.resolve(file));
        });
    }

    if (this.data.transform) {
      this.data.transform.forEach(function (transform) {
        b.transform(transform);
      });
    }

    var opts = grunt.util._.extend(this.data.options, {});
    var bundle = b.bundle(opts);
    bundle.on('error', function (err) {
      grunt.fail.warn(err);
    });

    var destPath = path.dirname(path.resolve(this.data.dest));
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }

    bundle
      .pipe(fs.createWriteStream(this.data.dest))
      .on('finish', done);
  });
};
