'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

}

util.inherits(MariaGenerator, yeoman.generators.NamedBase);

MariaGenerator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('controller.' + ext, path.join('app/scripts/controllers', this._.classify(this.name) + 'Controller.' + ext));
};
