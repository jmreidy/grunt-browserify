var moments = require('momentWrapper');
var evt = require('events');

module.exports = function () {
  console.log(evt);
  console.log(moments.createMoment());
};
