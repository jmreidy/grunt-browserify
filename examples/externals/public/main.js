require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"/Users/jmreidy/Workspace/Libs/grunt-browserify/examples/externals/client/foo/bar.js":[function(require,module,exports){
module.exports=require('k/YW6a');
},{}],"k/YW6a":[function(require,module,exports){
module.exports = function () {
  alert('Hello From Foo/Bar!');
}

},{}]},{},["k/YW6a"])
;
;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var bar = require('./foo/bar');
var test = require('./test');

test();
bar();


},{"./foo/bar":"k/YW6a","./test":2}],2:[function(require,module,exports){
//run as soon as the file is required
window.globalVar = 'test';

module.exports = function () {
  alert('Hello World!');
}

},{}]},{},[1])
;