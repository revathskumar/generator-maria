'use strict';
var util = require('util');
var path = require('path');
var mariaBase = require('../maria-base');

var MariaGenerator = module.exports = function MariaGenerator() {
  mariaBase.apply(this, arguments);

};

util.inherits(MariaGenerator, mariaBase);

MariaGenerator.prototype.createViewFiles = function createViewFiles() {
  var appPath = this.env.options.appPath;
  var name = this._.classify(this.name) + 'View';
  this.template('view' + this.scriptSuffix, path.join(appPath + '/scripts/views',
     name + this.scriptSuffix));

  this.addScriptToIndex('views/' + name);
};
