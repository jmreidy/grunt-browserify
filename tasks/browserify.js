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
var shim = require('browserify-shim');

module.exports = function (grunt) {
  grunt.registerMultiTask('browserify', 'Grunt task for browserify.', function () {
    var opts = this.options();
    var ctorOpts = {};
    var shims;

    // parse shims now so they can be added to noParse array
    // files listed in noParse will be skipped by Browserify
    // greatly speeding up builds that reference large libs like jQuery
    if (opts.shim) {
      shims = opts.shim;
      ctorOpts.noParse = [].concat(opts.noParse);
      delete opts.noParse;
      Object.keys(shims)
        .forEach(function (alias) {
          shims[alias].path = path.resolve(shims[alias].path);
          ctorOpts.noParse.push(shims[alias].path);
        });
    }

    grunt.util.async.forEachSeries(this.files, function (file, next) {
      var aliases;

      ctorOpts.entries = grunt.file.expand({filter: 'isFile'}, file.src).map(function (f) {
        return path.resolve(f);
      });

      var b = browserify(ctorOpts);
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
        aliases = opts.alias;
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

      if (opts.aliasMappings) {
        aliases = opts.aliasMappings.slice ? opts.aliasMappings : [opts.aliasMappings];
        aliases.forEach(function (alias) {
          alias.expand = true; // so the user doesn't have to specify
          grunt.file.expandMapping(alias.src, alias.dest, alias)
            .forEach(function (file) {
              var expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
              b.require(path.resolve(file.src[0]), {expose: expose});
            });
        });
      }

      if (shims) {
        b = shim(b, shims);
      }

      if (opts.external) {
        grunt.file.expand({filter: function (src) {
            return grunt.file.exists(src);
          }}, opts.external)
            .forEach(function (file) {
              b.external(path.resolve(file));
            });
      }

      if (opts.externalize) {
        opts.externalize.forEach(function (lib) {
          if (/\//.test(lib)) {
            grunt.file.expand({filter: 'isFile'}, lib).forEach(function (file) {
              b.require(path.resolve(file));
            });
          }
          else {
            b.require(lib);
          }
        });
      }

      if (opts.transform) {
        opts.transform.forEach(function (transform) {
          b.transform(transform);
        });
      }

      var destPath = path.dirname(path.resolve(file.dest));
      if (!grunt.file.exists(destPath)) {
        grunt.file.mkdir(destPath);
      }

      b.bundle(opts, function (err, src) {
        if (err) {
          grunt.fail.warn(err);
        }

        grunt.file.write(file.dest, src);
        grunt.log.ok('Bundled ' + file.dest);
        next();
      });

    }, this.async());
  });
};
