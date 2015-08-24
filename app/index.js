'use strict';
var generators = require('yeoman-generator');
var yosay      = require('yosay');

module.exports = generators.Base.extend({
  constructor: function() {
    var testLocal;

    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skip the message after the installation of dependencies',
      type: Boolean
    });

    this.option('test-framework', {
      desc: 'Test Framework to be invoked',
      type: String,
      default: 'mocha'
    });

    if(this.options['test-framework'] === 'mocha') {
      testLocal = require.resolve('generator-mocha/generators/app/index.js');
    } else if(this.options['test-framework'] === 'jasmine') {
      testLocal = require.resolve('generator-jasmine/generators/app/index.js');
    }

    this.composeWith(this.options['test-framework']+ ':app', {
        options: {
          'skip-install': this.options['skip-install']
        }
    }, {
      local: testLocal
    });
  },

  initializing: function() {
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();

    if(!this.options['skip-welcome-message']) {
      this.log(yosay('Out of the box I include HTML5 Boilerplate, jQuery, Maria.js and Modernizr.'));
    }

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

        done();
      }.bind(this));
    } else {
      this.compassBootstrap = this.options.bootstrap;
      this.config.set('coffee', this.options.coffee);
      this.config.set('compassBootstrap', this.options.bootstrap);
      done();
    }
  },

  writing: {

    setupEnv: function () {
      var appPath = this.config.get('appPath');
      this.mkdir(appPath);
      this.mkdir(appPath + '/scripts');
      this.mkdir(appPath + '/styles');
      this.mkdir(appPath + '/images');
      this.copy('app/404.html', appPath + '/404.html');
      this.copy('app/favicon.ico', appPath + '/favicon.ico');
      this.copy('app/robots.txt', appPath + '/robots.txt');
      this.copy('app/htaccess', appPath + '/.htaccess');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
    },

    git: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    bower: function () {
      this.template('bowerrc', '.bowerrc');
      this.template('_bower.json', 'bower.json');
    },

    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },

    gruntfile: function() {
      if (this.testFramework === 'jasmine') {
        this.write('Gruntfile.js', this.engine(this.read('Gruntfile.js')).replace(/mocha/g, 'jasmine'));
      } else {
        this.template('Gruntfile.js');
      }
    },

    mainStylesheet: function () {
      var appPath = this.config.get('appPath');
      if (this.compassBootstrap) {
        return this.template('main.scss', appPath + '/styles/main.scss');
      }
      var contentText = [
        'body {\n    background: #fafafa;\n}',
        '\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}'
      ];
      this.write(appPath + '/styles/main.css', contentText.join('\n'));
    },

    writeIndex: function () {
      this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'app/index.html'));
      this.indexFile = this.engine(this.indexFile, this);

      var vendorJS = [
        'bower_components/jquery/jquery.js',
        'bower_components/maria/maria.js'
      ];

      this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

      if (this.compassBootstrap) {
        // wire Twitter Bootstrap plugins
        this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
          'bower_components/sass-bootstrap/js/affix.js',
          'bower_components/sass-bootstrap/js/alert.js',
          'bower_components/sass-bootstrap/js/dropdown.js',
          'bower_components/sass-bootstrap/js/tooltip.js',
          'bower_components/sass-bootstrap/js/modal.js',
          'bower_components/sass-bootstrap/js/transition.js',
          'bower_components/sass-bootstrap/js/button.js',
          'bower_components/sass-bootstrap/js/popover.js',
          'bower_components/sass-bootstrap/js/carousel.js',
          'bower_components/sass-bootstrap/js/scrollspy.js',
          'bower_components/sass-bootstrap/js/collapse.js',
          'bower_components/sass-bootstrap/js/tab.js'
        ]);
      }

      this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        searchPath: ['.tmp', 'app'],
        optimizedPath: 'scripts/main.js',
        sourceFileList: [
          'scripts/namespace.js'
        ]
      });
      var appPath = this.config.get('appPath');
      this.write(appPath + '/index.html', this.indexFile);
    },

    namespaceJs: function () {
      var appPath = this.config.get('appPath');
      var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
      var ext = this.options.coffee ? 'coffee' : 'js';
      this.sourceRoot(path.join(__dirname, dirPath));
      this.template('app.' + ext, appPath + '/scripts/namespace.' + ext);
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-install-message']
    });
  },

  end: function() {
    var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));
    var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install & bower install') +
      ', inject your' +
      '\nfront end dependencies by running ' +
      chalk.yellow.bold('grunt wiredep') +
      '.';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }
  }
});


