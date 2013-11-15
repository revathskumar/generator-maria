'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  yeoman.NamedBase.apply(this, arguments);

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

}

util.inherits(MariaGenerator, yeoman.NamedBase);

MariaGenerator.prototype.createModelFiles = function createModelFiles() {
  var appPath = this.config.get('appPath');
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('model.' + ext, path.join(appPath + '/scripts/models', this._.classify(this.name) + 'Model.' + ext));
  this.template('collection.' + ext, path.join(appPath + '/scripts/models', this._.classify(this.name) + 'sModel.' + ext));
};
