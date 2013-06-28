require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
//run as soon as the file is required
window.globalVar = 'test';

module.exports = function () {
  alert('Hello World!');
}

},{}],"jQuery":[function(require,module,exports){
module.exports=require('x/T2kW');
},{}],2:[function(require,module,exports){
var $ = require('../vendor/client/jQuery');
var test = require('./test');

$().ready(function () {
  test();
});


},{"../vendor/client/jQuery":"x/T2kW","./test":1}]},{},[2,1])
;