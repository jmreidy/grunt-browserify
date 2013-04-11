;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
module.exports = function () {
  return 'test';
};

},{}],2:[function(require,module,exports){
var a = require('./a');

module.exports = function (test) {
  return 'b.js';
}

},{"./a":1}],3:[function(require,module,exports){
var a = require('./a');
var b = require('./b');

module.exports = function () {
  return 'this should not be included';
}

},{"./a":1,"./b":2}]},{},[1,2,3])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam1yZWlkeS9Xb3Jrc3BhY2UvTGlicy9ncnVudC1icm93c2VyaWZ5L3Rlc3QvZml4dHVyZXMvYS5qcyIsIi9Vc2Vycy9qbXJlaWR5L1dvcmtzcGFjZS9MaWJzL2dydW50LWJyb3dzZXJpZnkvdGVzdC9maXh0dXJlcy9iLmpzIiwiL1VzZXJzL2ptcmVpZHkvV29ya3NwYWNlL0xpYnMvZ3J1bnQtYnJvd3NlcmlmeS90ZXN0L2ZpeHR1cmVzL2lnbm9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAndGVzdCc7XG59O1xuIiwidmFyIGEgPSByZXF1aXJlKCcuL2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGVzdCkge1xuICByZXR1cm4gJ2IuanMnO1xufVxuIiwidmFyIGEgPSByZXF1aXJlKCcuL2EnKTtcbnZhciBiID0gcmVxdWlyZSgnLi9iJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3RoaXMgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCc7XG59XG4iXX0=
;