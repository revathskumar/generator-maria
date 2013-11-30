/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs      = require('fs');

describe('maria generator with coffee', function () {
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
        features: ['coffee']
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
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/.htaccess',
      'app/scripts/namespace.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  describe('sub generators', function (){
    beforeEach(function (done) {
      helpers.before('test');
      var out = [
        '{',
        '  "generator-maria": {',
        '    "coffee": true,',
        '    "compassBootstrap": true,',
        '    "appPath": "app",',
        '    "testFramework": "mocha"',
        '  }',
        '}'
      ];
      fs.writeFile('.yo-rc.json', out.join('\n'), done);
    });

    it('creates maria controller', function (done) {
      var controller = helpers.createGenerator('maria:controller', [
        '../../controller'
      ], ['Foo']);

      controller.run({}, function () {
        helpers.assertFiles([
          ['app/scripts/controllers/FooController.coffee',
            /maria\.Controller\.subclass temp, \'FooController\'/]
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
          ['app/scripts/models/FooModel.coffee',
            /maria\.Model\.subclass temp, \'FooModel\'/],
          ['app/scripts/models/FoosModel.coffee',
            /maria\.setModel\.subclass temp, \'FoosModel\'/]
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
          ['app/scripts/views/FooView.coffee',
            /maria\.ElementView\.subclass temp, \'FooView\'/]
        ]);
        done();
      });
    });
  });
});
