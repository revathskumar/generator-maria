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
      ], ['temp'], {bootstrap: true, 'skip-install': true});

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
      ['package.json', /("name": "temp")(|.|\n)*grunt-contrib-compass/],
      ['bower.json', /("name": "temp")(|.|\n)*sass-bootstrap/],
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
});
