/* global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('maria generator with appPath option', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('maria:app', [
        '../../app', [
          helpers.createDummyGenerator(), 'mocha:app'
        ]
      ], ['temp'], {appPath: 'public', 'skip-install': true});

      helpers.mockPrompt(this.app, {
        features: ['compassBootstrap']
      });

      done();
    }.bind(this));
  });

  describe('create expected files', function () {
    it('in path specified by --appPath', function (done) {
      var expected = [
        // add files you expect to exist here.
        ['Gruntfile.js',/app: 'public'/],
        '.jshintrc',
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        ['.bowerrc', /public\/bower_components/],
        ['package.json', /"name": "temp"/],
        ['bower.json', /"name": "temp"/],
        'public/index.html',
        'public/scripts/namespace.js',
        'public/404.html',
        'public/favicon.ico',
        'public/robots.txt',
        'public/.htaccess'
      ];

      this.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

  describe('creates sub generators', function () {
    beforeEach(function (done) {
      var out = [
        '{',
        '  "generator-maria": {',
        '    "coffee": false,',
        '    "compassBootstrap": true,',
        '    "appPath": "public",',
        '    "testFramework": "mocha"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));
      done();
    });

    it('controller', function (done) {
      var controller = helpers.createGenerator('maria:controller', [
        '../../controller'
      ], ['Foo']);

      controller.run({}, function () {
        helpers.assertFiles([
          ['public/scripts/controllers/FooController.js',
            /maria\.Controller\.subclass\(temp, \'FooController\'/]
        ]);
        done();
      });
    });


    it('model', function (done) {
      var model = helpers.createGenerator('maria:model', [
        '../../model'
      ], ['Foo']);

      model.run({}, function () {
        helpers.assertFiles([
          ['public/scripts/models/FooModel.js',
            /maria\.Model\.subclass\(temp, \'FooModel\'/],
          ['public/scripts/models/FoosModel.js',
            /maria\.setModel\.subclass\(temp, \'FoosModel\'/]
        ]);
        done();
      });
    });

    it('view', function (done) {
      var view = helpers.createGenerator('maria:view', [
        '../../view'
      ], ['Foo']);

      view.run({}, function () {
        helpers.assertFiles([
          ['public/scripts/views/FooView.js',
            /maria\.ElementView\.subclass\(temp, \'FooView\'/]
        ]);
        done();
      });
    });
  });
});
