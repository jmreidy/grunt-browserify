var _ = require('lodash');
var path = require('path');

module.exports = GruntBrowserifyRunner;

function GruntBrowserifyRunner(options) {
  this.browserify = options.browserify || require('browserify');
  this.watchify = options.watchify || require('watchify');
  this.logger = options.logger;
  this.writer = options.writer;
}

GruntBrowserifyRunner.prototype = _.create(GruntBrowserifyRunner.prototype, {
  run: function (files, destination, options, next) {
    var self = this;

    //determine watchify or browserify
    var engine = options.watch? this.watchify: this.browserify;

    //set constructor options and instantiate
    var bOpts = options.browserifyOptions || {};
    bOpts.entries = files;
    var b = engine(bOpts);

    b.on('error', function (err) {
      self.logger.fail.warn(err);
    });


    //define default bundle options
    var ignoredAliases = [];
    options.bundleOptions = (options.bundleOptions || {});
    options.bundleOptions.filter = function (requireId) {
      return (ignoredAliases.indexOf(requireId) < 0);
    };


    if (options.alias) {
      _.forEach(options.alias, function (aliasPair) {
        if (!aliasPair.match(':')) {
          self.logger.fail.warn('Aliases must be split with a colon');
        }
        else {
          aliasPair = aliasPair.split(':');
          b.require(path.resolve(aliasPair[0]), {expose: aliasPair[1]});
        }
      });

    }

    if (options.require) {
      _.forEach(options.require, function (file) {
        b.require(file);
      });
    }

    if (options.exclude) {
      _.forEach(options.exclude, function (file) {
        b.exclude(path.resolve(file));
      });
    }

    if (options.ignore) {
      _.forEach(options.ignore, function (file) {
        b.ignore(path.resolve(file));
      });
    }

    if (options.external) {
      _.forEach(options.external, function (id) {
        //allow externalizing of alias lists
        if (id.match(':')) {
          id = id.split(':')[1];
        }

        try {
          require.resolve(id);
        }
        catch (e) {
          //it's an arbitary alias that can't be resolved,
          //add it to the ignore list
          ignoredAliases.push(id);
        }
        b.external(id);
      });
    }

    if (options.transform) {
      _.forEach(options.transform, function (transformer) {
        if (typeof transformer !== 'object') {
          b.transform(transformer);
        }
        else {
          b.transform(transformer[1], transformer[0]);
        }
      });
    }

    if (options.plugin) {
      _.forEach(options.plugin, function (plugin) {
        if (typeof plugin !== 'object') {
          b.plugin(plugin);
        }
        else {
          b.plugin(plugin[0], plugin[1]);
        }
      });
    }


    var destPath = this.createDestDir(destination);
    var keepAlive = this.keepAliveFn.bind(this, options);
    var done = options.keepAlive? keepAlive : next;
    var bundleComplete = this.onBundleComplete(destination, done);

    if (options.watch) {
      var bundleUpdate = this.onBundleComplete(destination, keepAlive);
      b.on('update', function (ids) {
        ids.forEach(function (id) {
          self.logger.log.ok(id + ' changed, updating browserify bundle.');
        });
        doBundle(b, options, bundleUpdate);
      });
    }

    doBundle(b, options, bundleComplete);
  },

  createDestDir: function (destination) {
    var destPath = path.dirname(path.resolve(destination));
    if (!this.writer.exists(destPath)) {
      this.writer.mkdir(destPath);
    }
    return destPath;
  },

  keepAliveFn: function (options) {
    this.logger.log.ok('Watchifying...');
  },

  onBundleComplete: function (destination, next) {
    var self = this;
    return function (err, src) {
      if (err) {
        self.logger.log.error(err);
        self.logger.fail.warn('Error running grunt-browserify.');
      }

      self.writer.write(destination, src + ';');
      next();
    };
  }
});

function doBundle(browserifyInstance, opts, bundleComplete) {
  if (opts.preBundleCB) {
    opts.preBundleCB(browserifyInstance);
  }

  browserifyInstance.bundle((opts.bundleOptions || {}), function (err, src) {
    if (opts.postBundleCB) {
      opts.postBundleCB(err, src, bundleComplete);
    }
    else {
      bundleComplete(err, src);
    }
  });
}

