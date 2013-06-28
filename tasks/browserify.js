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


    grunt.util.async.forEachSeries(this.files, function (file, next) {
      var aliases;

      ctorOpts.entries = grunt.file.expand({filter: 'isFile'}, file.src).map(function (f) {
        return path.resolve(f);
      });

      if (opts.noParse) {
        ctorOpts.noParse = opts.noParse.map(function (filePath) {
          return path.resolve(filePath);
        });
        delete opts.noParse;
      }

      var b = browserify(ctorOpts);
      b.on('error', function (err) {
        grunt.fail.warn(err);
      });

      if (opts.ignore) {
        grunt.file.expand({nonull: true}, opts.ignore)
          .forEach(function (file) {
            var ignoreFile = file;

            try {
              if (fs.statSync(file).isFile()) {
                ignoreFile = path.resolve(file);
              }
            } catch (e) {
              // don't do anything
            }

            b.ignore(ignoreFile);
          });
      }

      if (opts.alias) {
        aliases = opts.alias;
        if (aliases.split) {
          aliases = aliases.split(',');
        }
        aliases.forEach(function (alias) {
          alias = alias.split(':');
          var aliasSrc = alias[0];
          var aliasDest = alias[1];

          if (/\//.test(aliasSrc)) {
            aliasSrc = path.resolve(aliasSrc);
          }
          //if the alias exists and is a filepath, resolve it
          if (aliasDest && /\//.test(aliasDest)) {
            aliasDest = path.resolve(aliasDest);
          }

          if (!aliasDest) {
            aliasDest = aliasSrc;
          }

          b.require(aliasSrc, {expose: aliasDest});
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

      if (opts.shim) {
        shims = opts.shim;
        Object.keys(shims)
          .forEach(function (alias) {
            shims[alias].path = path.resolve(shims[alias].path);
          });
        b = shim(b, shims);
      }

      if (opts.external) {
        opts.external.forEach(function (external) {
          if (/\//.test(external)) {
            grunt.file.expand({filter: function (src) {
                return grunt.file.exists(src);
              }}, external)
                .forEach(function (file) {
                  b.external(path.resolve(file));
                });
          } else {
            b.external(external);
          }

        });
      }

      if (opts.externalize) {
        grunt.fail.warn('Externalize is deprecated, please use alias instead');
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
