/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('maria generator', function () {
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
      ]);
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
      ['component.json', /"name": "temp"/],
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

  it('creates expected files with --coffee', function (done) {
    this.app.options.coffee = true;
    this.app.run({}, function () {
      helpers.assertFiles([
        'app/scripts/namespace.coffee'
      ]);
      done();
    });
  });

  it('creates maria controller', function (done) {
    var controller = helpers.createGenerator('maria:controller', [
      '../../controller'
    ], ['Foo']);

    controller.run({}, function () {
      helpers.assertFiles([
        ['app/scripts/controllers/FooController.js',
          /maria\.Controller\.subclass\(temp, \'FooController\'/]
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
          /maria\.setModel\.subclass\(temp, \'FoosModel\'/]
      ]);
      done();
    });
  });
});
