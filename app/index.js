'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MariaGenerator = module.exports = function MariaGenerator() {
  yeoman.Base.apply(this, arguments);

  this.config.defaults({
    'appPath': 'app'
  });
  this.appPath = 'app';

  this.testFramework = this.options['test-framework'] || 'mocha';

  this.config.set('testFramework', this.testFramework);

  if (this.options.appPath) {
    this.appPath = this.options.appPath;
    this.config.set('appPath', this.options.appPath);
  }

  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.on('end', function () {
    if (['app', 'maria'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MariaGenerator, yeoman.Base);

MariaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Maria.js and Modernizr.');

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: []
  }];

  if (!this.options.bootstrap) {
    prompts[0].choices.push({
      name: 'Twitter Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: true
    });
  }

  if (!this.options.coffee) {
    prompts[0].choices.push({
      name: 'Use CoffeeScript',
      value: 'coffee',
      checked: false
    });
  }

  if (prompts[0].choices.length > 0) {
    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.compassBootstrap = true;
      if (!this.options.bootstrap) {
        this.compassBootstrap = hasFeature('compassBootstrap');
      }

      if (!this.options.coffee) {
        this.options.coffee = hasFeature('coffee');
      }

      this.config.set('coffee', this.options.coffee);
      this.config.set('compassBootstrap', this.compassBootstrap);

      cb();
    }.bind(this));
  } else {
    this.compassBootstrap = this.options.bootstrap;
    this.config.set('coffee', this.options.coffee);
    this.config.set('compassBootstrap', this.options.bootstrap);
    cb();
  }
};

MariaGenerator.prototype.setupEnv = function setupEnv() {
  var appPath = this.config.get('appPath');
  this.mkdir(appPath);
  this.mkdir(appPath + '/scripts');
  this.mkdir(appPath + '/styles');
  this.mkdir(appPath + '/images');
  this.copy('app/404.html', appPath + '/404.html');
  this.copy('app/favicon.ico', appPath + '/favicon.ico');
  this.copy('app/robots.txt', appPath + '/robots.txt');
  this.copy('app/htaccess', appPath + '/.htaccess');
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
  this.template('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

MariaGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

MariaGenerator.prototype.indexFile = function indexFile() {
  var appPath = this.config.get('appPath');
  if (this.testFramework === 'jasmine') {
    this.write(appPath + '/index.html', this.engine(this.read(appPath + '/index.html')).replace(/mocha/gi, 'Jasmine'));
  } else {
    this.copy('app/index.html', appPath + '/index.html');
  }
};

MariaGenerator.prototype.gruntfile = function gruntfile() {
  if (this.testFramework === 'jasmine') {
    this.write('Gruntfile.js', this.engine(this.read('Gruntfile.js')).replace(/mocha/g, 'jasmine'));
  } else {
    this.template('Gruntfile.js');
  }
};

MariaGenerator.prototype.mainStylesheet = function mainStylesheet() {
  var appPath = this.config.get('appPath');
  if (this.compassBootstrap) {
    return this.template('main.scss', appPath + '/styles/main.scss');
  }
  var contentText = [
    'body {\n    background: #fafafa;\n}',
    '\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}'
  ];
  this.write(appPath + '/styles/main.css', contentText.join('\n'));
};

MariaGenerator.prototype.namespaceJs = function namespaceJs() {
  var appPath = this.config.get('appPath');
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.template('app.' + ext, appPath + '/scripts/namespace.' + ext);
};
