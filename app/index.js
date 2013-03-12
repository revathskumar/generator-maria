'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' + 'npm install &; bower install'.bold.yellow + ' to install the required dependencies.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(MariaGenerator, yeoman.generators.NamedBase);

MariaGenerator.prototype.setupEnv = function setupEnv() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.template('app/404.html');
  this.template('app/index.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

MariaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

MariaGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

MariaGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('component.json', 'component.json');
};
