'use strict';
var util = require('util');
var path = require('path');
var mariaBase = require('../maria-base');

module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  mariaBase.apply(this, arguments);

}

util.inherits(MariaGenerator, mariaBase);

MariaGenerator.prototype.createModelFiles = function createModelFiles() {
  var appPath = this.config.get('appPath');
  var name = this._.classify(this.name);
  this.template('model' + this.scriptSuffix, path.join(appPath + '/scripts/models',
    name + 'Model' + this.scriptSuffix));
  this.template('collection' + this.scriptSuffix, path.join(appPath + '/scripts/models',
    name + 'sModel' + this.scriptSuffix));

  this.addScriptToIndex('models/' + name + 'Model');
  this.addScriptToIndex('models/' + name + 'sModel');
};
