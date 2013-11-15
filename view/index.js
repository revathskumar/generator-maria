'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MariaGenerator = module.exports = function MariaGenerator() {
  yeoman.NamedBase.apply(this, arguments);

  var dirPath = this.config.get('coffee') ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

}

util.inherits(MariaGenerator, yeoman.NamedBase);

MariaGenerator.prototype.createViewFiles = function createViewFiles() {
  var appPath = this.config.get('appPath');
  var ext = this.config.get('coffee') ? 'coffee' : 'js';
  this.template('view.' + ext, path.join(appPath + '/scripts/views', this._.classify(this.name) + 'View.' + ext));
};
