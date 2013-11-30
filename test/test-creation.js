/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs      = require('fs');

describe('maria generator default', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('maria:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ], ['temp'], {'skip-install': true});

      helpers.mockPrompt(this.app, {
        features: ['compassBootstrap']
      });

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      ['package.json', /"name": "temp"/],
      ['bower.json', /"name": "temp"/],
      'app/index.html',
      'app/scripts/namespace.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/.htaccess'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  // it('creates expected files with --coffee', function (done) {
  //   this.app.options.coffee = true;
  //   this.app.run({}, function () {
  //     helpers.assertFiles([
  //       'app/scripts/namespace.coffee'
  //     ]);
  //     done();
  //   });
  // });

  describe('sub generators', function () {
    beforeEach(function (done) {
      var out = [
        '{',
        '  "generator-maria": {',
        '    "coffee": false,',
        '    "compassBootstrap": true,',
        '    "appPath": "app",',
        '    "testFramework": "mocha"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));
      fs.mkdirSync('app');
      out = [
        '<html>',
        '  <body>',
        '',
        '<!-- build:js({.tmp,app}) scripts/main.js -->',
        '<script src="scripts/namespace.js"></script>',
        '<!-- endbuild -->',
        '  </body>',
        '<html>'
      ];
      fs.writeFileSync('app/index.html', out.join('\n'));
      done();
    });

    it('creates maria controller', function (done) {
      var controller = helpers.createGenerator('maria:controller', [
        '../../controller'
      ], ['Foo']);

      controller.run({}, function () {
        helpers.assertFiles([
          ['app/scripts/controllers/FooController.js',
            /maria\.Controller\.subclass\(temp, \'FooController\'/],
          ['app/index.html',
            /<script src="scripts\/controllers\/FooController\.js"><\/script>/]
        ]);
        done();
      });
    });

    it('creates maria model', function (done) {
      var model = helpers.createGenerator('maria:model', [
        '../../model'
      ], ['Foo']);

      model.run({}, function () {
        helpers.assertFiles([
          ['app/scripts/models/FooModel.js',
            /maria\.Model\.subclass\(temp, \'FooModel\'/],
          ['app/scripts/models/FoosModel.js',
            /maria\.setModel\.subclass\(temp, \'FoosModel\'/],
          ['app/index.html',
            /<script src="scripts\/models\/FooModel\.js"><\/script>/],
          ['app/index.html',
            /<script src="scripts\/models\/FoosModel\.js"><\/script>/]
        ]);
        done();
      });
    });

    it('creates maria view', function (done) {
      var view = helpers.createGenerator('maria:view', [
        '../../view'
      ], ['Foo']);

      view.run({}, function () {
        helpers.assertFiles([
          ['app/scripts/views/FooView.js',
            /maria\.ElementView\.subclass\(temp, \'FooView\'/],
          ['app/index.html',
            /<script src="scripts\/views\/FooView\.js"><\/script>/],
        ]);
        done();
      });
    });
  });
});
