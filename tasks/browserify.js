'use strict';

var fs = require('fs');
var path = require('path');
var through = require('through');
var _ = require('lodash');
var browserify = require('browserify');
var shim = require('browserify-shim');
var async = require('async');

/*
* grunt-browserify
* https://github.com/jmreidy/grunt-browserify
*
* Copyright (c) 2013 Justin Reidy
* Licensed under the MIT license.
*/
module.exports = function (grunt) {
  grunt.registerMultiTask('browserify', 'Grunt task for browserify.', function () {
    var shims;
    var aliases = [];
    var task = this;
    var browserifyConstructorOpts = {};

    async.forEachSeries(this.files, function (file, next) {
      var opts = configureOptions(task.options(), file, browserifyConstructorOpts);

      var b = browserify(browserifyConstructorOpts);
      b.on('error', function (err) {
        grunt.fail.warn(err);
      });

      configureIgnore(opts, b);
      configureAliases(opts, aliases, b);
      configureAliasMappings(opts, aliases, b);
      configureShims(opts, shims, b, browserifyConstructorOpts);
      configureExternal(opts, b);

      opts.transform.forEach(function (transform) {
        b.transform(transform);
      });

      var destPath = createDestDir(file.dest);
      var bundleComplete = onBundleComplete(file.dest, next);

      if (opts.preBundleCB) {
        opts.preBundleCB(b);
      }

      b.bundle(opts, function (err, src) {
        if (opts.postBundleCB) {
          opts.postBundleCB(err, src, bundleComplete);
        }
        else {
          bundleComplete(err, src);
        }
      });

    }, this.async());
  });

  /**
  * Parse the supplied task options, splitting out configuration options
  * from the browserify constructor opts
  */
  var configureOptions = function(taskOpts, currentFile, browserifyConstructorOpts) {
    _.defaults(taskOpts, {transform: []});
    browserifyConstructorOpts.entries = grunt.file.expand({filter: 'isFile'}, currentFile.src).map(function (f) {
      return path.resolve(f);
    });

    if (taskOpts.extensions) {
      browserifyConstructorOpts.extensions = taskOpts.extensions;
      delete taskOpts.extensions;
    }

    if (taskOpts.noParse) {
      browserifyConstructorOpts.noParse = taskOpts.noParse.map(function (filePath) {
        return path.resolve(filePath);
      });
      delete taskOpts.noParse;
    }

    return taskOpts;
  };

  /**
  * Ignore the specified files from the browserify bundle
  */
  var configureIgnore = function (options, browserifyInstance) {
    if (!options.ignore) { return; }
    grunt.file.expand({nonull: true}, _.flatten(options.ignore))
      .forEach(function (file) {
        var ignoreFile = file;

        try {
          if (fs.statSync(file).isFile()) {
            ignoreFile = path.resolve(file);
          }
        } catch (e) {
          // don't do anything
        }

        browserifyInstance.ignore(ignoreFile);
      });
  };

  var configureAliases = function (opts, aliases, browserifyInstance) {
    if (!opts.alias) { return aliases; }
    aliases = opts.alias;
    if (aliases.split) {
      aliases = aliases.split(',');
    }

    aliases = _.flatten(aliases);
    aliases.forEach(function (alias) {
      alias = alias.split(':');
      var aliasSrc = alias[0];
      var aliasDest = alias[1];
      var aliasDestResolved, aliasSrcResolved;

      // if the source has '/', it might be an inner module; resolve as filepath
      // only if it's a valid one
      if (/\//.test(aliasSrc)) {
        aliasSrcResolved = path.resolve(aliasSrc);
        aliasSrc = grunt.file.exists(aliasSrcResolved) && grunt.file.isFile(aliasSrcResolved) ?
        aliasSrcResolved : aliasSrc;
      }
      //if the alias exists and is a filepath, resolve it if it's a valid path
      if (aliasDest && /\//.test(aliasDest)) {
        aliasDestResolved = path.resolve(aliasDest);
        aliasDest = grunt.file.exists(aliasDestResolved) && grunt.file.isFile(aliasDestResolved) ? aliasDestResolved : aliasDest;
      }

      if (!aliasDest) {
        aliasDest = aliasSrc;
      }

      browserifyInstance.require(aliasSrc, {expose: aliasDest});
    });
    return aliases;
  };

  var configureAliasMappings = function (opts, aliases, browserifyInstance) {
    if (!opts.aliasMappings) { return aliases; }
    aliases = _.isArray(opts.aliasMappings) ? opts.aliasMappings : [opts.aliasMappings];
    aliases.forEach(function (alias) {
      alias.expand = true; // so the user doesn't have to specify
      grunt.file.expandMapping(alias.src, alias.dest, alias).forEach(function (file) {
        var expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
        browserifyInstance.require(path.resolve(file.src[0]), {expose: expose});
      });
    });
    return aliases;
  };

  var configureShims = function (opts, shims, browserifyInstance, browserifyConstructorOpts) {
    if (!opts.shim) { return; }
    shims = opts.shim;
    var noParseShimExists = false;
    var shimPaths = Object.keys(shims)
      .map(function (alias) {
        var shimPath = path.resolve(shims[alias].path);
        shims[alias].path = shimPath;
        if (!noParseShimExists) {
          noParseShimExists = browserifyConstructorOpts.noParse && browserifyConstructorOpts.noParse.indexOf(shimPath) > -1;
        }
        return shimPath;
      });
    browserifyInstance = shim(browserifyInstance, shims);

    if (noParseShimExists) {
      var shimmed = [];
      browserifyInstance.transform(function (file) {
        if (shimmed.indexOf(file) < 0 &&
        browserifyConstructorOpts.noParse.indexOf(file) > -1 &&
        shimPaths.indexOf(file) > -1) {
          shimmed.push(file);
          var data = 'var global=self;';
          var write = function (buffer) {
            return data += buffer;
          };
          var end = function () {
            this.queue(data);
            this.queue(null);
          };
          return through(write, end);
        }
        return through();
      });
    }
  };

  var configureExternal = function (opts, browserifyInstance) {
    if (!opts.external) { return; }
    var externalFiles = [];
    var externalModules = [];

    _.flatten(opts.external).forEach(function (external) {
      if (/\//.test(external)) {
        var expandedExternals = grunt.file.expand(external);
        if (expandedExternals.length > 0) {
          expandedExternals.forEach(function (dest) {
            var externalResolved = path.resolve(dest);
            if (grunt.file.exists(externalResolved)) {
              externalFiles.push(externalResolved);
            }
            else {
              externalModules.push(dest);
            }
          });
        }
        else {
          externalModules.push(external);
        }
      }
      else {
        externalModules.push(external);
      }
    });

    //treat existing files as normal
    externalFiles.forEach(function (external) {
      browserifyInstance.external(external);
    });

    //filter arbitrary external ids from normal browserify behavior
    if (externalModules.length > 0) {
      var _filter;
      externalModules.forEach(function (external) {
        browserifyInstance.external(external);
      });
      if (opts.filter) {
        _filter = opts.filter;
      }
      opts.filter = function (id) {
        var included = externalModules.indexOf(id) < 0;
        if (_filter) { return _filter(id) && included; }
        else { return included; }
      };
    }
  };

  /**
  * Create the destination directory, if it doesn't exist
  */
  var createDestDir = function (destination) {
    var destPath = path.dirname(path.resolve(destination));
    if (!grunt.file.exists(destPath)) {
      grunt.file.mkdir(destPath);
    }
    return destPath;
  };

  /**
  * Wire the callback to call on bundle completion
  */
  var onBundleComplete = function (destination, next) {
    return function (err, src) {
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn('Error running grunt-browserify.');
      }

      grunt.file.write(destination, src);
      grunt.log.ok('Bundled ' + destination);
      next();
    };
  };
};

