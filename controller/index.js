'use strict';
var util = require('util');
var path = require('path');
var mariaBase = require('../maria-base');

var MariaGenerator = module.exports = function MariaGenerator() {
  mariaBase.apply(this, arguments);

};

util.inherits(MariaGenerator, mariaBase);

MariaGenerator.prototype.createControllerFiles = function createControllerFiles() {
  var appPath = this.config.get('appPath');
  var controllerName = this._.classify(this.name) + 'Controller';
  this.template('controller' + this.scriptSuffix, path.join(appPath + '/scripts/controllers',
    controllerName  + this.scriptSuffix));

  this.addScriptToIndex('controllers/' + controllerName);
};
