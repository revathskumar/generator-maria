'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = MariaGenerator;

function MariaGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.hookFor(this.testFramework, { as: 'app' });

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
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');
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

MariaGenerator.prototype.packageJSON = function packageJSON() {
  this.template('package.json');
};

MariaGenerator.prototype.indexFile = function indexFile() {
  if (this.testFramework === 'jasmine') {
    this.write('app/index.html', this.read('app/index.html').replace(/mocha/gi, 'Jasmine'), true);
  } else {
    this.template('app/index.html');
  }
};

MariaGenerator.prototype.gruntfile = function gruntfile() {
  if (this.testFramework === 'jasmine') {
    this.write('Gruntfile.js', this.read('Gruntfile.js').replace(/mocha/g, 'jasmine'));
  } else {
    this.template('Gruntfile.js');
  }
};

MariaGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
};

MariaGenerator.prototype.namespaceJs = function namespaceJs() {
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.template('app.' + ext, 'app/scripts/namespace.' + ext);
};
