'use strict';

var grunt = require('grunt');

function readFile(path) {
  var content = grunt.util.normalizelf(grunt.file.read(path));
  //the last line is non-deterministic and must be stripped
  content = content.replace(/\}.*\n;/, '');
  return content;
}


module.exports = {
  basic: function (test) {
    test.expect(1);

    var actual = readFile('tmp/basic.js');
    var expected = readFile('test/expected/basic.js');
    test.equal(expected, actual, 'should bundle the specified JS files to destination');

    test.done();
  },

  ignores: function (test) {
    test.expect(1);

    var actual = readFile('tmp/ignores.js');
    var expected = readFile('test/expected/ignores.js');
    test.equal(expected, actual, 'should ignore specified files from the output bundle');

    test.done();
  },

  alias: function (test) {
    test.expect(2);

    var actual = readFile('tmp/alias.js');
    var expected = readFile('test/expected/alias.js');
    test.equal(expected, actual, 'should alias the specified requires');

    actual = readFile('tmp/aliasString.js');
    expected = readFile('test/expected/alias.js');
    test.equal(expected, actual, 'should work with strings or arrays');

    test.done();
  },

  external: function (test) {
    test.expect(1);

    var actual = readFile('tmp/external.js');
    var expected = readFile('test/expected/external.js');
    test.equal(expected, actual, 'should mark the correct files for external loading');

    test.done();
  },

  sourceMaps: function (test) {
    test.expect(1);

    var actual = readFile('tmp/sourceMaps.js');
    var expected = readFile('test/expected/sourceMaps.js');
    test.equal(expected, actual, 'should enable souce maps with a debug flug.');

    test.done();
  }

};
