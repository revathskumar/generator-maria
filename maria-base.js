'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var MariaGenerator  = module.exports = function MariaGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(MariaGenerator, yeoman.generators.NamedBase);
