'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MariaGenerator = module.exports = function MariaGenerator() {
  yeoman.NamedBase.apply(this, arguments);

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

};

util.inherits(MariaGenerator, yeoman.NamedBase);

MariaGenerator.prototype.createControllerFiles = function createControllerFiles() {
  var appPath = this.config.get('appPath');
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('controller.' + ext, path.join(appPath + '/scripts/controllers', this._.classify(this.name) + 'Controller.' + ext));
};
