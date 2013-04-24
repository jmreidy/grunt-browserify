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

    var opts = this.options();

    grunt.util.async.forEachSeries(this.files, function (file, next) {

      var files = grunt.file.expand({filter: 'isFile'}, file.src).map(function (f) {
        return path.resolve(f);
      });

      var b = browserify(files);
      b.on('error', function (err) {
        grunt.fail.warn(err);
      });

      if (opts.ignore) {
        grunt.file.expand({filter: 'isFile'}, opts.ignore)
          .forEach(function (file) {

            b.ignore(path.resolve(file));
          });
      }

      if (opts.alias) {
        var aliases = opts.alias;
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

      if (opts.external) {
        grunt.file.expand({filter: 'isFile'}, opts.external)
          .forEach(function (file) {
            b.external(path.resolve(file));
          });
      }

      if (opts.transform) {
        opts.transform.forEach(function (transform) {
          b.transform(transform);
        });
      }

      var bundle = b.bundle(opts);
      bundle.on('error', function (err) {
        grunt.fail.warn(err);
      });

      var destPath = path.dirname(path.resolve(file.dest));
      if (!grunt.file.exists(destPath)) {
        grunt.file.mkdir(destPath);
      }

      bundle
        .pipe(fs.createWriteStream(file.dest))
        .on('finish', function () {
          grunt.log.ok('Bundled ' + file.dest);
          next();
        });

    }, this.async());
  });
};
