'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

}

util.inherits(MariaGenerator, yeoman.generators.NamedBase);

MariaGenerator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('collection.' + ext, path.join('app/scripts/collections', this.name + '-collection.' + ext));
};
