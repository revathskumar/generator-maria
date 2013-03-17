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

MariaGenerator.prototype.createViewFiles = function createViewFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('view.' + ext, path.join('app/scripts/views', this._.classify(this.name) + 'View.' + ext));
};
