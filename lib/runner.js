var _ = require('lodash');

module.exports = GruntBrowserifyRunner;

function GruntBrowserifyRunner(options) {
  this.browserify = options.browserify || require('browserify');
  this.watchify = options.watchify || require('watchify');
  this.logger = options.logger;
}

GruntBrowserifyRunner.prototype = _.create(GruntBrowserifyRunner.prototype, {
  run: function (files, options, next) {
    var b = options.watch? this.watchify() : this.browserify();
    b.on('error', function (err) {
      this.logger.fail.warn(err);
    }.bind(this));
    next();
  }
});
